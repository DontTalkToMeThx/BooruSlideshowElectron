class SiteManagerDanbooru extends SiteManager {
	constructor(sitesManager, pageLimit) {
		super(sitesManager, SITE_DANBOORU, 'https://danbooru.donmai.us', pageLimit);
	}

	buildPingRequestUrl() {
		return this.url + '/posts.json?limit=1';
	}

	buildRequestUrl(searchText, pageNumber) {
		var query = this.buildSiteSpecificQuery(searchText);

		return this.url + '/posts.json?tags=' + query + '&page=' + pageNumber + '&limit=' + this.pageLimit;
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
		if (jsonPost.hasOwnProperty('file_url') &&
			jsonPost.hasOwnProperty('preview_file_url')) {
			if (this.isPathForSupportedMediaType(jsonPost.file_url)) {
				if (this.areSomeTagsAreBlacklisted(jsonPost.tag_string))
					return;
				// console.log(jsonPost)
				if (!this.isRatingAllowed(jsonPost.rating))
					return

				var newSlide = new Slide(
					SITE_DANBOORU,
					jsonPost.id,
					this.getCorrectFileUrl(jsonPost.file_url),
					this.getCorrectFileUrl(jsonPost.preview_file_url),
					this.url + '/posts/' + jsonPost.id,
					jsonPost.image_width,
					jsonPost.image_height,
					new Date(jsonPost.created_at),
					jsonPost.score,
					this.getMediaTypeFromPath(jsonPost.file_url),
					jsonPost.md5,
					jsonPost.tag_string
				);
				if (!this.sitesManager.model.includeFavorites && this.sitesManager.model.personalList.contains(newSlide)) return
				if (!this.sitesManager.model.showSeen && this.sitesManager.model.seenList != null && this.sitesManager.model.seenList.seenList != null && this.sitesManager.model.seenList.seenList.includes(newSlide.md5))
					return
				this.allUnsortedSlides.push(newSlide);
			}
		}
	}

	getCorrectFileUrl(jsonPostFileUrl) {
		if (jsonPostFileUrl.substring(0, 4) == 'http')
			return jsonPostFileUrl;
		else
			return this.url + jsonPostFileUrl;
	}
}