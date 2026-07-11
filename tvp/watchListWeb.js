// 
var fullListing;
var reducedListing;
var rawJson = JSON.stringify(watchlistData); // Sourced into webpage separately (see html file)

function buildFromFilters()
{
    timedprint("Called buildFromFilters()...");
    
    // INFORMATION COLLECTION FROM WEBPAGE
    // Status
    var requestedStatusCurrent     = document.filtersForm.statusCurrent.checked;
    var requestedStatusBorrowed    = document.filtersForm.statusBorrowed.checked;
    var requestedStatusSoon        = document.filtersForm.statusSoon.checked;
    var requestedStatusBacklog     = document.filtersForm.statusBacklog.checked;
    var requestedStatusTobechecked = document.filtersForm.statusTobechecked.checked;
    var requestedStatusWatched     = document.filtersForm.statusWatched.checked;
    var requestedStatusWaitingfor  = document.filtersForm.statusWaitingfor.checked;
    var requestedStatusUnavailable = document.filtersForm.statusUnavailable.checked;

    // Watcher-FormPickup
    var requestedWatcherM2 = document.filtersForm.watcherM2.checked;
    var requestedWatcherM1 = document.filtersForm.watcherM1.checked;


    // Started
    var requestStarted = document.filtersForm.startedYes.checked;

    // Types (template value)
    var requestedTypeMovie = document.filtersForm.typeMovie.checked;
    var requestedTypeSeries = document.filtersForm.typeSeries.checked;
    var requestedTypezzzOther = document.filtersForm.typezzzOther.checked;


    // Categories
    var requestedCategoryAction = document.filtersForm.categoryAction.checked;
    var requestedCategoryAfternoon = document.filtersForm.categoryAfternoon.checked;
    var requestedCategoryChristmas = document.filtersForm.categoryChristmas.checked;
    var requestedCategoryComedy = document.filtersForm.categoryComedy.checked;
    var requestedCategoryDocumentary = document.filtersForm.categoryDocumentary.checked;
    var requestedCategoryDrama = document.filtersForm.categoryDrama.checked;
    var requestedCategoryzzzOther = document.filtersForm.categoryzzzOther.checked;


    // Sources
    var requestedSourceAmazon = document.filtersForm.sourceAmazon.checked;
    var requestedSourceBluRay = document.filtersForm.sourceBluRay.checked;
    var requestedSourceDigital = document.filtersForm.sourceDigital.checked;
    var requestedSourceDVD = document.filtersForm.sourceDVD.checked;
    var requestedSourceiPlayer = document.filtersForm.sourceiPlayer.checked;
    var requestedSourceNetFlix = document.filtersForm.sourceNetFlix.checked;
    var requestedSourceVHS = document.filtersForm.sourceVHS.checked;
    var requestedSourceVirgin = document.filtersForm.sourceVirgin.checked;
    var requestedSourceYouTube = document.filtersForm.sourceYouTube.checked;
    var requestedSourceYouView = document.filtersForm.sourceYouView.checked;
    var requestedSourcezzzNoSource = document.filtersForm.sourcezzzNoSource.checked;



    // LISTING REBUILDING BASED ON ABOVE SELECTIONS
    reducedListing = {};
    Object.keys(fullListing).forEach(function(key)
    {
        var singleItem  = fullListing[key];
        var itemTitle   = singleItem.title;

        // Status
        var hasValidStatus = false;
        var itemStatus = singleItem.status;
        if (itemStatus != null)
        {
            if( (itemStatus == "s1.Current"     && requestedStatusCurrent     == true) ||
                (itemStatus == "s2.Borrowed"    && requestedStatusBorrowed    == true) ||
                (itemStatus == "s3.Soon"        && requestedStatusSoon        == true) ||
                (itemStatus == "s5.Backlog"     && requestedStatusBacklog     == true) ||
                (itemStatus == "s6.ToBeChecked" && requestedStatusTobechecked == true) ||
                (itemStatus == "s7.Watched"     && requestedStatusWatched     == true) ||
                (itemStatus == "s8.WaitingFor"  && requestedStatusWaitingfor  == true) ||
                (itemStatus == "s9.Unavailable" && requestedStatusUnavailable == true) )
                {
                    hasValidStatus = true;
                }
        }

        // Watcher-ListRebuild
        var hasValidWatcher = false;
        if(singleItem.watcher != null)
        {
            var WatcherM2 = singleItem.watcher.M2 ? true : false;
            var WatcherM1 = singleItem.watcher.M1 ? true : false;

            // IF statement includes "&&" as this is only a template line, which may form multiple lines (joined by it). PS1 script cleans as appropriate.
            if (
                 (WatcherM2 == requestedWatcherM2) &&
                 (WatcherM1 == requestedWatcherM1) 
               )
           {
                hasValidWatcher = true;
            }
        }

        // Types
        var hasValidType = false;
        if(singleItem.type != null)
        {
        	/* Template values */
            var isMovie = singleItem.type.Movie  ? true : false;
            var isSeries = singleItem.type.Series  ? true : false;
            var iszzzOther = singleItem.type.zzzOther  ? true : false;


            if(
                (isMovie  == true && requestedTypeMovie  == true) ||
                (isSeries  == true && requestedTypeSeries  == true) ||
                (iszzzOther  == true && requestedTypezzzOther  == true) 
              )
            {
                hasValidType = true;
            }
        }

        // Categories
        var hasValidCategory = false;
        if(singleItem.category != null)
        {
        	/* Template values */
            var categoryAction = singleItem.category.Action  ? true : false;
            var categoryAfternoon = singleItem.category.Afternoon  ? true : false;
            var categoryChristmas = singleItem.category.Christmas  ? true : false;
            var categoryComedy = singleItem.category.Comedy  ? true : false;
            var categoryDocumentary = singleItem.category.Documentary  ? true : false;
            var categoryDrama = singleItem.category.Drama  ? true : false;
            var categoryzzzOther = singleItem.category.zzzOther  ? true : false;


            if(
                (categoryAction  == true && requestedCategoryAction  == true) ||
                (categoryAfternoon  == true && requestedCategoryAfternoon  == true) ||
                (categoryChristmas  == true && requestedCategoryChristmas  == true) ||
                (categoryComedy  == true && requestedCategoryComedy  == true) ||
                (categoryDocumentary  == true && requestedCategoryDocumentary  == true) ||
                (categoryDrama  == true && requestedCategoryDrama  == true) ||
                (categoryzzzOther  == true && requestedCategoryzzzOther  == true) 
              )
            {
                hasValidCategory = true;
            }
        }

        // Sources
        var hasValidSource = false;
        if(singleItem.source != null)
        {
            var sourceAmazon = singleItem.source.Amazon  ? true : false;
            var sourceBluRay = singleItem.source.BluRay  ? true : false;
            var sourceDigital = singleItem.source.Digital  ? true : false;
            var sourceDVD = singleItem.source.DVD  ? true : false;
            var sourceiPlayer = singleItem.source.iPlayer  ? true : false;
            var sourceNetFlix = singleItem.source.NetFlix  ? true : false;
            var sourceVHS = singleItem.source.VHS  ? true : false;
            var sourceVirgin = singleItem.source.Virgin  ? true : false;
            var sourceYouTube = singleItem.source.YouTube  ? true : false;
            var sourceYouView = singleItem.source.YouView  ? true : false;
            var sourcezzzNoSource = singleItem.source.zzzNoSource  ? true : false;


            if(
                (sourceAmazon  == true && requestedSourceAmazon  == true) ||
                (sourceBluRay  == true && requestedSourceBluRay  == true) ||
                (sourceDigital  == true && requestedSourceDigital  == true) ||
                (sourceDVD  == true && requestedSourceDVD  == true) ||
                (sourceiPlayer  == true && requestedSourceiPlayer  == true) ||
                (sourceNetFlix  == true && requestedSourceNetFlix  == true) ||
                (sourceVHS  == true && requestedSourceVHS  == true) ||
                (sourceVirgin  == true && requestedSourceVirgin  == true) ||
                (sourceYouTube  == true && requestedSourceYouTube  == true) ||
                (sourceYouView  == true && requestedSourceYouView  == true) ||
                (sourcezzzNoSource  == true && requestedSourcezzzNoSource  == true) 
              )
            {
                hasValidSource = true;
            }
        }

        // Started - Option to limit only to those items marked as "started".
        var hasValidStartedValue = true;
        var watchedDate = singleItem.watcheddate;

        if(requestStarted == true && watchedDate != "Started")
        {
            hasValidStartedValue = false;
        }

        // If the fitlers match, add the movie to the reduced list
        if (hasValidSource == true && hasValidType == true && hasValidStartedValue == true && hasValidStatus == true && hasValidWatcher == true && hasValidCategory == true)
        {
            reducedListing[key] = singleItem;
        }
    });
    displayListing();
}

function displayListing()
{
    timedprint("displayListing()...");
    var keyCount = 0;
    var listingsTable = "<table border=1><tr><td><b>Title</b></td></tr>";
    // For each row in json...
    Object.keys(reducedListing).sort().forEach(function(key)
    {
        keyCount++;
        var singleItem = reducedListing[key];
        itemTitle      = singleItem.title;
        listingsTable += "<tr><td onClick='displayItemDetails(\"" + key + "\")'><input type=checkbox></input>" + itemTitle + "</td></tr>";
    });

    listingsTable += "</table>";
    document.getElementById("listHeader").innerHTML = "List (" + keyCount + ")";
    document.getElementById("currentListing").innerHTML = listingsTable;
}

function displayItemDetails(itemID)
{
    timedprint("displayItemDetails(" + itemID + ")... ");
    singleItem = reducedListing[itemID];
    timedprint("---- title: " + singleItem.title);
    timedprint("---- notes: " + singleItem.notes);
    document.getElementById("detailsTopLeft").innerHTML  = "<b><font size=+2>" + singleItem.title + "</font></b> " +
                                                           (singleItem.year     == null ? "" : "(" + singleItem.year + ")") + "<br />" +
                                                           (singleItem.duration == null ? "" : singleItem.duration) + " | " +
                                                           (singleItem.rating  == null ? "" : singleItem.rating) +"<br />" +
                                                           "Status: " + (singleItem.status   == null ? "" : singleItem.status) + "<br />" +
                                                           "Watched: " + (singleItem.watched  == null ? "" : singleItem.watched);
    document.getElementById("detailsTopRight").innerHTML = (singleItem.image  == null ? "" : "<img height='150' src='" + singleItem.image + "'/>");
    document.getElementById("itemSummary").innerHTML     = "<b>Summary</b><br />" + (singleItem.summary  == null ? "" : singleItem.summary);
    
    sourcesObject = singleItem.source;
    sources = "";
    Object.keys(sourcesObject).sort().forEach(function(key)
    {
        if ((sourcesObject[key]).toLowerCase() == "y")
        {
            sources += key + ", ";
        }
    });
    document.getElementById("itemSources").innerHTML = sources;

    document.getElementById("itemNotes").innerHTML   = singleItem.notes    == null ? "" : singleItem.notes.replace(/\n/g,"<br>");
    document.getElementById("itemOwner").innerHTML   = singleItem.owner    == null ? "" : singleItem.owner;
}

function readWatchListSourceJson() 
{
    // Set the full list which never changes, and set the reduced set to full for the initial display
    timedprint("readWatchListSourceJson()...") ;
    fullListing = JSON.parse(rawJson);
    reducedListing = JSON.parse(rawJson);
}

function setAllSources(checkedOrNot)
{
    timedprint('---- checkedOrNot = ' + checkedOrNot);
    document.filtersForm.sourceAmazon.checked = checkedOrNot;
    document.filtersForm.sourceBluRay.checked = checkedOrNot;
    document.filtersForm.sourceDigital.checked = checkedOrNot;
    document.filtersForm.sourceDVD.checked = checkedOrNot;
    document.filtersForm.sourceiPlayer.checked = checkedOrNot;
    document.filtersForm.sourceNetFlix.checked = checkedOrNot;
    document.filtersForm.sourceVHS.checked = checkedOrNot;
    document.filtersForm.sourceVirgin.checked = checkedOrNot;
    document.filtersForm.sourceYouTube.checked = checkedOrNot;
    document.filtersForm.sourceYouView.checked = checkedOrNot;
    document.filtersForm.sourcezzzNoSource.checked = checkedOrNot;

}

function timedprint(msg)
{
    var d  = new Date();
    var hh = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours());
    var mm = (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
    var ss = (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
    var t  = hh + ":" + mm + ":" + ss
    document.getElementById("mepLog").innerHTML += t + ": " + msg + "<br />";
}
