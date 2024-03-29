class DataLoader {
    constructor(model) {
        this._model = model;
        this.storage = require("electron-json-storage")
    }

    loadUserSettings() {
        // console.log("loading")
        var _this = this;

        this.storage.getMany([
            'videoVolume',
            'videoMuted',
            'sitesToSearch',
            'secondsPerSlide',
            'maxWidth',
            'maxHeight',
            'autoFitSlide',
            'includeImages',
            'includeGifs',
            'includeWebms',
            'includeExplicit',
            'includeSafe',
            'includeQuestionable',
            'hideBlacklist',
            'blacklist',
            'derpibooruApiKey',
            'e621Login',
            'e621ApiKey',
            'gelbooruLogin',
            'gelbooruApiKey',
            'danbooruLogin',
            'danbooruApiKey',
            'storeHistory',
            'searchHistory',
            'includeDupes',
            'includeFavorites',
            'favoriteRemotely',
            'slideshowPlaysFullVideo',
            'slideshowGifLoop',
            'slideshowLowDurationMp4Seconds'
        ],
            function (error, data) {
                for (let prop in data) {
                    // console.log(prop, data[prop])
                    if (data[prop].hasOwnProperty(prop)) data[prop] = data[prop][prop]
                    else data[prop] = null
                }
                if (data != null) {
                    var videoVolume = data['videoVolume'];
                    var videoMuted = data['videoMuted'];
                    var sitesToSearch = data['sitesToSearch'];
                    var secondsPerSlide = data['secondsPerSlide'];
                    var maxWidth = data['maxWidth'];
                    var maxHeight = data['maxHeight'];
                    var autoFitSlide = data['autoFitSlide'];
                    var includeImages = data['includeImages'];
                    var includeGifs = data['includeGifs'];
                    var includeWebms = data['includeWebms'];
                    var includeExplicit = data['includeExplicit'];
                    var includeQuestionable = data['includeQuestionable'];
                    var includeSafe = data['includeSafe'];
                    var includeFavorites = data['includeFavorites'];
                    var hideBlacklist = data['hideBlacklist'];
                    var blacklist = data['blacklist'];
                    var derpibooruApiKey = data['derpibooruApiKey'];
                    var e621Login = data['e621Login'];
                    var e621ApiKey = data['e621ApiKey'];
                    var gelbooruLogin = data['gelbooruLogin'];
                    var gelbooruApiKey = data['gelbooruApiKey'];
                    var storeHistory = data['storeHistory'];
                    var searchHistory = data['searchHistory'];
                    var includeDupes = data['includeDupes']
                    var favoriteRemotely = data['favoriteRemotely']
                    var danbooruLogin = data['danbooruLogin']
                    var danbooruApiKey = data['danbooruApiKey']
                    var slideshowPlaysFullVideo = data['slideshowPlaysFullVideo']
                    var slideshowGifLoop = data['slideshowGifLoop']
                    var slideshowLowDurationMp4Seconds = data['slideshowLowDurationMp4Seconds']

                    if (videoVolume == null) {
                        try {
                            _this._model.setVideoVolume(_this._model.videoVolume);
                        } catch (e) { }
                    }
                    else {
                        if (_this._model.videoVolume != videoVolume) {
                            try {
                                _this._model.setVideoVolume(videoVolume);
                            } catch (e) { }
                        }
                    }

                    if (videoMuted == null) {
                        try {
                            _this._model.setVideoMuted(_this._model.videoMuted);
                        } catch (e) { }
                    }
                    else {
                        if (_this._model.videoMuted != videoMuted) {
                            try {
                                _this._model.setVideoMuted(videoMuted);
                            } catch (e) { }
                        }
                    }

                    if (_this._model.secondsPerSlide != secondsPerSlide) {
                        try {
                            _this._model.setSecondsPerSlideIfValid(secondsPerSlide);
                        } catch (e) { }
                    }

                    if (_this._model.maxWidth != maxWidth) {
                        try {
                            _this._model.setMaxWidth(maxWidth);
                        } catch (e) { }
                    }

                    if (_this._model.maxHeight != maxHeight) {
                        try {
                            _this._model.setMaxHeight(maxHeight);
                        } catch (e) { }
                    }

                    if (autoFitSlide != null) {
                        if (_this._model.autoFitSlide != autoFitSlide) {
                            try {
                                _this._model.setAutoFitSlide(autoFitSlide);
                            } catch (e) { }
                        }
                    }

                    if (e621Login != null && _this._model.e621Login != e621Login) {
                        try {
                            _this._model.setE621Login(e621Login);
                        } catch (e) { }
                    }

                    if (e621ApiKey != null && _this._model.e621ApiKey != e621ApiKey) {
                        try {
                            _this._model.setE621ApiKey(e621ApiKey);
                        } catch (e) { }
                    }

                    if (gelbooruLogin != null && _this._model.gelbooruLogin != gelbooruLogin) {
                        try {
                            _this._model.setGelbooruLogin(gelbooruLogin);
                        } catch (e) { }
                    }

                    if (gelbooruApiKey != null && _this._model.gelbooruApiKey != gelbooruApiKey) {
                        try {
                            _this._model.setGelbooruApiKey(gelbooruApiKey);
                        } catch (e) { }
                    }

                    if (danbooruLogin != null && _this._model.danbooruLogin != danbooruLogin) {
                        try {
                            _this._model.setDanbooruLogin(danbooruLogin);
                        } catch (e) { }
                    }

                    if (danbooruApiKey != null && _this._model.danbooruApiKey != danbooruApiKey) {
                        try {
                            _this._model.setDanbooruApiKey(danbooruApiKey);
                        } catch (e) { }
                    }

                    if (favoriteRemotely != null && _this._model.favoriteRemotely != favoriteRemotely) {
                        try {
                            _this._model.setFavoriteRemotely(favoriteRemotely);
                        } catch (e) { }
                    }

                    if (slideshowPlaysFullVideo != null) {
                        if (_this._model.slideshowPlaysFullVideo != slideshowPlaysFullVideo) {
                            try {
                                _this._model.setSlideshowPlaysFullVideo(slideshowPlaysFullVideo);
                            } catch (e) { }
                        }
                    }

                    if (slideshowGifLoop != null) {
                        if (_this._model.slideshowGifLoop != slideshowGifLoop) {
                            try {
                                _this._model.setSlideshowGifLoop(slideshowGifLoop);
                            } catch (e) { }
                        }
                    }

                    if (slideshowLowDurationMp4Seconds != null) {
                        if (_this._model.slideshowLowDurationMp4Seconds != slideshowLowDurationMp4Seconds) {
                            try {
                                _this._model.setSlideshowLowDurationMp4Seconds(slideshowLowDurationMp4Seconds);
                            } catch (e) { }
                        }
                    }

                    if (_this._model instanceof SlideshowModel) {
                        if (sitesToSearch != null) {
                            let cleanSitesToSearch = Object.assign({}, _this.sitesToSearch);

                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_ATFBOORU);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_DANBOORU);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_DERPIBOORU);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_E621);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_GELBOORU);
                            //_this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_IBSEARCH);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_KONACHAN);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_REALBOORU);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_RULE34);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_PAHEAL);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_SAFEBOORU);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_XBOORU);
                            _this.addPropertyIfExists(sitesToSearch, cleanSitesToSearch, SITE_YANDERE);

                            _this._model.setSitesToSearch(cleanSitesToSearch);
                        }

                        if (includeImages == null) {
                            _this._model.setIncludeImages(_this._model.includeImages);
                        }
                        else {
                            if (_this._model.includeImages != includeImages) {
                                _this._model.setIncludeImages(includeImages);
                            }
                        }

                        if (includeGifs == null) {
                            _this._model.setIncludeGifs(_this._model.includeGifs);
                        }
                        else {
                            if (_this._model.includeGifs != includeGifs) {
                                _this._model.setIncludeGifs(includeGifs);
                            }
                        }

                        if (includeWebms != null) {
                            if (_this._model.includeWebms != includeWebms) {
                                _this._model.setIncludeWebms(includeWebms);
                            }
                        }

                        if (includeExplicit != null) {
                            if (_this._model.includeExplicit != includeExplicit) {
                                _this._model.setIncludeExplicit(includeExplicit);
                            }
                        }

                        if (includeQuestionable != null) {
                            if (_this._model.includeQuestionable != includeQuestionable) {
                                _this._model.setIncludeQuestionable(includeQuestionable);
                            }
                        }

                        if (includeSafe != null) {
                            if (_this._model.includeSafe != includeSafe) {
                                _this._model.setIncludeSafe(includeSafe);
                            }
                        }

                        if (includeFavorites != null) {
                            // console.log("loaded: " + includeFavorites)
                            if (_this._model.includeFavorites != includeFavorites) {
                                _this._model.setIncludeFavorites(includeFavorites);
                            }
                        }

                        if (includeDupes != null) {
                            if (_this._model.includeDupes != includeDupes) {
                                _this._model.setIncludeDupes(includeDupes);
                            }
                        }

                        if (hideBlacklist != null) {
                            if (_this._model.hideBlacklist != hideBlacklist) {
                                _this._model.setHideBlacklist(hideBlacklist);
                            }
                        }

                        if (blacklist != null && _this._model.blacklist != blacklist) {
                            _this._model.setBlacklist(blacklist);
                        }

                        if (derpibooruApiKey != null && _this._model.derpibooruApiKey != derpibooruApiKey) {
                            _this._model.setDerpibooruApiKey(derpibooruApiKey);
                        }

                        if (storeHistory != null) {
                            if (_this._model.storeHistory != storeHistory) {
                                _this._model.setStoreHistory(storeHistory);
                            }
                        }

                        if (searchHistory != null) {
                            if (_this._model.searchHistory.toString() != searchHistory.toString()) {
                                _this._model.setSearchHistory(searchHistory);
                            }
                        }
                    }
                }
            }
        );

        this.storage.get('personalListItems',
            function (error, obj) {
                // console.log(obj)
                if (Object.keys(obj).length > 0) {
                    // var fs = require('fs')
                    // var json = fs.readFileSync('S:\\Downloads\\awesomeStuff.json', 'utf8')
                    // obj = JSON.parse(json)
                    var personalListItems = obj['personalListItems'];
                    // console.log(personalListItems)

                    if (personalListItems == null) {
                        _this._model.setPersonalList(_this._model.personalList);
                    }
                    else {
                        var personalList = new PersonalList(personalListItems, _this, _this._model);

                        if (_this._model.personalList != personalList) {
                            var personalList =
                                _this._model.setPersonalList(personalList);
                        }
                    }
                    _this.savePersonalList()
                }
            }
        );

        this.storage.get('seenList', function (error, seenList) {
            if (seenList != null) {
                _this._model.seenList = seenList;
            }
        })
    }

    addPropertyIfExists(sitesToSearch, cleanSitesToSearch, siteEnum) {
        if (sitesToSearch.hasOwnProperty(siteEnum)) {
            cleanSitesToSearch[siteEnum] = sitesToSearch[siteEnum];
        }
    }

    saveVideoVolume() {
        this.storage.set('videoVolume', { 'videoVolume': this._model.videoVolume });
    }

    saveVideoMuted() {
        this.storage.set('videoMuted', { 'videoMuted': this._model.videoMuted });
    }

    saveSitesToSearch() {
        this.storage.set('sitesToSearch', { 'sitesToSearch': this._model.sitesToSearch });
    }

    saveSecondsPerSlide() {
        this.storage.set('secondsPerSlide', { 'secondsPerSlide': this._model.secondsPerSlide });
    }

    saveMaxWidth() {
        this.storage.set('maxWidth', { 'maxWidth': this._model.maxWidth });
    }

    saveMaxHeight() {
        this.storage.set('maxHeight', { 'maxHeight': this._model.maxHeight });
    }

    saveAutoFitSlide() {
        this.storage.set('autoFitSlide', { 'autoFitSlide': this._model.autoFitSlide });
    }

    saveIncludeImages() {
        this.storage.set('includeImages', { 'includeImages': this._model.includeImages });
    }

    saveIncludeGifs() {
        this.storage.set('includeGifs', { 'includeGifs': this._model.includeGifs });
    }

    saveIncludeWebms() {
        this.storage.set('includeWebms', { 'includeWebms': this._model.includeWebms });
    }

    saveIncludeExplicit() {
        this.storage.set('includeExplicit', { 'includeExplicit': this._model.includeExplicit });
    }

    saveIncludeQuestionable() {
        this.storage.set('includeQuestionable', { 'includeQuestionable': this._model.includeQuestionable });
    }

    saveIncludeSafe() {
        this.storage.set('includeSafe', { 'includeSafe': this._model.includeSafe });
    }

    saveIncludeFavorites() {
        this.storage.set('includeFavorites', { 'includeFavorites': this._model.includeFavorites });
    }

    saveHideBlacklist() {
        this.storage.set('hideBlacklist', { 'hideBlacklist': this._model.hideBlacklist });
    }

    saveBlacklist() {
        this.storage.set('blacklist', { 'blacklist': this._model.blacklist });
    }

    saveDerpibooruApiKey() {
        this.storage.set('derpibooruApiKey', { 'derpibooruApiKey': this._model.derpibooruApiKey });
    }

    saveE621Login() {
        // console.log("saved")
        this.storage.set('e621Login', { 'e621Login': this._model.e621Login });
    }

    saveE621ApiKey() {
        // console.log("saved")
        this.storage.set('e621ApiKey', { 'e621ApiKey': this._model.e621ApiKey });
    }

    saveGelbooruLogin() {
        // console.log("saved")
        this.storage.set('gelbooruLogin', { 'gelbooruLogin': this._model.gelbooruLogin });
    }

    saveGelbooruApiKey() {
        // console.log("saved")
        this.storage.set('gelbooruApiKey', { 'gelbooruApiKey': this._model.gelbooruApiKey });
    }

    saveDanbooruLogin() {
        // console.log("saved")
        this.storage.set('danbooruLogin', { 'danbooruLogin': this._model.danbooruLogin });
    }

    saveDanbooruApiKey() {
        // console.log("saved")
        this.storage.set('danbooruApiKey', { 'danbooruApiKey': this._model.danbooruApiKey });
    }

    saveStoreHistory() {
        this.storage.set('storeHistory', { 'storeHistory': this._model.storeHistory });
    }

    saveSearchHistory() {
        this.storage.set('searchHistory', { 'searchHistory': this._model.searchHistory });
    }

    saveIncludeDupes() {
        // console.log("saved")
        this.storage.set('includeDupes', { 'includeDupes': this._model.includeDupes });
    }

    saveFavoriteRemotely() {
        this.storage.set('favoriteRemotely', { 'favoriteRemotely': this._model.favoriteRemotely });
    }

    saveSlideshowPlaysFullVideo() {
        this.storage.set('slideshowPlaysFullVideo', { 'slideshowPlaysFullVideo': this._model.slideshowPlaysFullVideo });
    }

    saveSlideshowGifLoop() {
        this.storage.set('slideshowGifLoop', { 'slideshowGifLoop': this._model.slideshowGifLoop });
    }

    saveSlideshowLowDurationMp4Seconds() {
        this.storage.set('slideshowLowDurationMp4Seconds', { 'slideshowLowDurationMp4Seconds': this._model.slideshowLowDurationMp4Seconds });
    }

    savePersonalList(items) {
        // console.log(items)
        this.storage.set('personalListItems', { 'personalListItems': items ? items : this._model.personalList.personalListItems });
        // console.log("Saved", this._model.personalList.personalListItems)
    }

    saveSeenList(seenList) {
        // console.log(items)
        while (seenList.seenList.length > seenList.max) {
            seenList.seenList.shift();
        }
        this.storage.set('seenList', seenList);
        // console.log("Saved", this._model.personalList.personalListItems)
    }
}
