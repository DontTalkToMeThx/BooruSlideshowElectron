class SiteManagerE621 extends SiteManager {
	constructor(sitesManager, pageLimit) {
		super(sitesManager, SITE_E621, 'https://e621.net', pageLimit);
	}

	buildPingRequestUrl() {
		return this.url + '/posts.json?limit=1';
	}

	buildRequestUrl(searchText, pageNumber) {
		var query = this.buildSiteSpecificQuery(searchText);
		let possibleLogin = this.sitesManager.model.e621ApiKey && this.sitesManager.model.e621Login ? '&login=' + this.sitesManager.model.e621Login + '&api_key=' + this.sitesManager.model.e621ApiKey : '';
		return this.url + '/posts.json?tags=' + query + '&page=' + pageNumber + '&limit=' + this.pageLimit + possibleLogin;
	}

	doesResponseTextIndicateOnline(responseText) {
		var jsonPosts;

		try {
			jsonPosts = JSON.parse(responseText);
			// console.log(jsonPosts)
		}
		catch (e) {
			console.log("JSON failed to parse.");
			console.log(e);
			return false;
		}

		if (jsonPosts == null)
			return false;

		return (jsonPosts.posts.length > 0);
	}

	addSlides(responseText) {
		this.addJsonSlides(responseText);
	}

	condenseTags(jsonPost) {
		// console.log(jsonPost)
		var arr = []
		for (var prop in jsonPost.tags) {
			arr = arr.concat(jsonPost.tags[prop])
		}
		return arr.join(" ")
	}

	favorite(value, postId) {
		if (!(this.sitesManager.model.e621ApiKey && this.sitesManager.model.e621Login)) {
			console.log("Could not favorite remotely: not logged in")
			return
		}

		if (value) {
			let url = `${this.url}/favorites.json?login=${this.sitesManager.model.e621Login}&api_key=${this.sitesManager.model.e621ApiKey}&post_id=${postId}`
			this.postRequest.makeWebsiteRequest(url, null, (txt, code) => { console.log(`Error favoriting remotely, code ${code}: ${txt}`) })
		} else {
			let url = `${this.url}/favorites/${postId}.json?login=${this.sitesManager.model.e621Login}&api_key=${this.sitesManager.model.e621ApiKey}`
			this.deleteRequest.makeWebsiteRequest(url, null, (txt, code) => { console.log(`Error deleting favoriting remotely, code ${code}: ${txt}`) })
		}
	}

	addSlide(jsonPost) {
		// console.log(jsonPost)
		if (!jsonPost.hasOwnProperty('id') ||
			!jsonPost.hasOwnProperty('file') ||
			!jsonPost.hasOwnProperty('preview') ||
			!jsonPost.hasOwnProperty('created_at') ||
			!jsonPost.hasOwnProperty('score') ||
			!jsonPost.hasOwnProperty('tags'))
			return;
		// console.log("good")
		jsonPost.file_url = jsonPost.file.url
		jsonPost.md5 = jsonPost.file.md5
		if (!jsonPost.file_url) return
		jsonPost.width = jsonPost.file.width
		jsonPost.height = jsonPost.file.height
		jsonPost.preview_url = jsonPost.preview.url
		jsonPost.newTags = this.condenseTags(jsonPost)
		// console.log(jsonPost.tags)

		// if (jsonPost.newTags.includes("flash"))
		

		if (!this.isPathForSupportedMediaType(jsonPost.file_url))
			return;

		if (!this.isRatingAllowed(jsonPost.rating))
			return

		if (this.areSomeTagsAreBlacklisted(jsonPost.newTags))
			return;

		var url = this.url + '/posts/' + jsonPost.id;

		var prefix = '';

		if (url.substring(0, 4) != 'http')
			prefix = 'https://';

		var date;

		if (jsonPost.created_at.s != null)
			date = this.convertSDateToDate(jsonPost.created_at.s)
		else
			date = this.convertSDateToDate(jsonPost.created_at)

		var newSlide = new Slide(
			SITE_E621,
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
			jsonPost.newTags,
			jsonPost.tags
		);
		// console.log(newSlide)
		if (!this.sitesManager.model.showSeen && this.sitesManager.model.seenList != null && this.sitesManager.model.seenList.seenList != null && this.sitesManager.model.seenList.seenList.includes(newSlide.md5))
			return
		if (!this.sitesManager.model.includeFavorites && this.sitesManager.model.personalList.contains(newSlide)) return
		this.allUnsortedSlides.push(newSlide);
	}
}