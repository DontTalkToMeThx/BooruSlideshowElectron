class SiteManagerYandere extends SiteManager {
	constructor(sitesManager, pageLimit) {
		super(sitesManager, SITE_YANDERE, 'https://yande.re', pageLimit);
	}

	buildPingRequestUrl() {
		return this.url + '/post.json?limit=1';
	}

	buildRequestUrl(searchText, pageNumber) {
		var query = this.buildSiteSpecificQuery(searchText);

		return this.url + '/post.json?tags=' + query + '&page=' + pageNumber + '&limit=' + this.pageLimit;
	}

	doesResponseTextIndicateOnline(responseText) {
		var jsonPosts;

		try {
			jsonPosts = JSON.parse(responseText);
		}
		catch (e) {
			console.log("JSON failed to parse.");
			console.log(e);
			return false;
		}

		if (jsonPosts == null)
			return false;

		return (jsonPosts.length > 0);
	}

	addSlides(responseText) {
		this.addJsonSlides(responseText);
	}

	addSlide(jsonPost) {
		// console.log(jsonPost)
		if (!jsonPost.hasOwnProperty('id') ||
			!jsonPost.hasOwnProperty('file_url') ||
			!jsonPost.hasOwnProperty('preview_url') ||
			!jsonPost.hasOwnProperty('width') ||
			!jsonPost.hasOwnProperty('height') ||
			!jsonPost.hasOwnProperty('created_at') ||
			!jsonPost.hasOwnProperty('score') ||
			!jsonPost.hasOwnProperty('tags'))
			return;

		if (!this.isPathForSupportedMediaType(jsonPost.file_url))
			return;

		if (this.areSomeTagsAreBlacklisted(jsonPost.tags))
			return;

		if (!this.isRatingAllowed(jsonPost.rating))
			return

		var url = this.url + '/post/show/' + jsonPost.id;

		var prefix = '';

		if (url.substring(0, 4) != 'http')
			prefix = 'https://';

		var date;

		if (jsonPost.created_at.s != null)
			date = this.convertSDateToDate(jsonPost.created_at.s)
		else
			date = this.convertSDateToDate(jsonPost.created_at)

		var newSlide = new Slide(
			SITE_YANDERE,
			jsonPost.id,
			prefix + jsonPost.file_url,
			prefix + jsonPost.preview_url,
			url,
			jsonPost.width,
			jsonPost.height,
			date,
			jsonPost.score,
			this.getMediaTypeFromPath(jsonPost.file_url),
			jsonPost.md5,
			jsonPost.tags
		);
		if (!this.sitesManager.model.showSeen && this.sitesManager.model.seenList != null && this.sitesManager.model.seenList.seenList.includes(newSlide.md5))
			return
		if (!this.sitesManager.model.includeFavorites && this.sitesManager.model.personalList.contains(newSlide)) 
			return
		this.allUnsortedSlides.push(newSlide);
	}
}