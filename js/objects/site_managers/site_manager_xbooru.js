class SiteManagerXbooru extends SiteManager {
	constructor(sitesManager, pageLimit) {
		super(sitesManager, SITE_XBOORU, 'https://xbooru.com', pageLimit);
	}

	buildPingRequestUrl() {
		return this.url + '/index.php?page=dapi&s=post&q=index&limit=1';
	}

	buildRequestUrl(searchText, pageNumber) {
		var query = this.buildSiteSpecificQuery(searchText);

		return this.url + '/index.php?page=dapi&s=post&q=index&tags=' + query + '&pid=' + (pageNumber - 1) + '&limit=' + this.pageLimit;
	}

	doesResponseTextIndicateOnline(responseText) {
		var parser = new DOMParser();
		var xml = parser.parseFromString(responseText, "text/xml");

		var xmlPosts = xml.getElementsByTagName("post");

		return (xmlPosts.length > 0);
	}

	addSlides(responseText) {
		this.addXmlSlides(responseText);
	}

	addSlide(xmlPost) {
		if (xmlPost.hasAttribute('file_url') &&
			xmlPost.hasAttribute('preview_url')) {
			if (this.isPathForSupportedMediaType(xmlPost.getAttribute('file_url'))) {
				if (this.areSomeTagsAreBlacklisted(xmlPost.getAttribute('tags')))
					return;
				if (!this.isRatingAllowed(xmlPost.getAttribute('rating')))
					return

				var newSlide = new Slide(
					SITE_XBOORU,
					xmlPost.getAttribute('id'),
					this.reformatFileUrl(xmlPost.getAttribute('file_url')),
					this.reformatFileUrl(xmlPost.getAttribute('preview_url')),
					this.url + '/index.php?page=post&s=view&id=' + xmlPost.getAttribute('id'),
					xmlPost.getAttribute('width'),
					xmlPost.getAttribute('height'),
					new Date(xmlPost.getAttribute('created_at')),
					xmlPost.getAttribute('score'),
					this.getMediaTypeFromPath(xmlPost.getAttribute('file_url')),
					xmlPost.getAttribute('md5'),
					xmlPost.getAttribute('tags')
				);
				if (!this.sitesManager.model.showSeen && this.sitesManager.model.seenList != null && this.sitesManager.model.seenList.seenList != null && this.sitesManager.model.seenList.seenList.includes(newSlide.md5))
					return
				if (!this.sitesManager.model.includeFavorites && this.sitesManager.model.personalList.contains(newSlide)) return
				this.allUnsortedSlides.push(newSlide);
			}
		}
	}
}