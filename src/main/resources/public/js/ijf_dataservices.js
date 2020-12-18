var ijfDataServices={

cache:[],

getData:function(dataSource, inFormKey, item, inField, inContainer, noCache)
{

    //attempt to pull data....
    try
    {
        if(ijfDataServices.cache[dataSource]!=null)
        {
		    var tempRetVal = ijfDataServices.cache[dataSource];
		    ijfDataServices.cache[dataSource]=null;
			return tempRetVal;
		}

        switch(dataSource) {
            case 'genericdatasource':
                this.getNamedSource(dataSource,inFormKey,item,inField,inContainer);
                break;
            default:
                return "No data source for:" + dataSource;
        }
        return "loading";

    }
    catch(e)
    {
        ijfUtils.footLog("Failed to get data:" + dataSource + " error:" + e.message);
    }

},
getGenericDataSourceSync:function(dataSource)
{

    var turl = dataSource;
    var retVal = "";

    $.ajax({
        async: false,
        type: 'GET',
        url: g_root + '/plugins/servlet/iforms?ijfAction=proxyHttpRequest&url=' + encodeURIComponent(turl),
        success: function(data) {
            ijfUtils.footLog("Successful data acquisition");
            retVal=data;
        },
        error: function(e) {
            if(e.statusText=="OK")
            {
                ijfUtils.footLog("Successful data acquisition");
                retVal=e.responseText;
            }
            else
            {
                ijfUtils.footLog("Failed data acquisition: " + dataSource + " "  + e.statusText);
                retVal="Failed data acquisition";
            }
        }
    });
    return retVal;
},
getNamedSource:function(dataSource,inFormKey,item,inField,inContainer)
{

   var turl = inField.dataReference;

    if(turl.indexOf("?")<0)
        turl = turl + '?itemId=' + item.key;
    else
        turl = turl + '&itemId=' + item.key;

    var seqStr = "";
    if(inField.fieldStyle)
    {
	    if(inField.fieldStyle.indexOf("sequence:true")>-1)
	    {
			seqStr = "&seq=" + moment().valueOf();
		}
	}

    $.ajax(g_root + '/plugins/servlet/iforms?ijfAction=proxyHttpRequest' + seqStr + '&url=' + encodeURIComponent(turl), {
        success: function(data) {
            //$('#main').html($(data).find('#main *'));
            ijfUtils.footLog("Successful data acquisition");
            ijfDataServices.cache[dataSource]=data;

            //pause just a little for the initial rendering
            inContainer.innerHTML="";
            setTimeout(ijf.extUtils.renderField(inFormKey,item,inField,inContainer),500);

        },
        error: function(e) {

            if(e.statusText=="OK")
            {
                ijfUtils.footLog("Successful data acquisition");

                ijfDataServices.cache[dataSource]=e.responseText;

                //pause just a little for the initial rendering
                inContainer.innerHTML="";
                setTimeout(ijf.extUtils.renderField(inFormKey,item,inField,inContainer),500);
            }
            else
            {
                ijfUtils.footLog("Failed data acquisition: " + dataSource + " "  + e.statusText);
                ijfDataServices.cache[dataSource]="Failed to acquire data";

                //pause just a little for the initial rendering
                inContainer.innerHTML="";
                setTimeout(ijf.extUtils.renderField(inFormKey,item,inField,inContainer),500);
            }
        }
    });
},
getRenderNamedSource:function(dataSource,inContainer)
{

    var turl = dataSource;

    $.ajax(g_root + '/plugins/servlet/iforms?ijfAction=proxyHttpRequest&url=' + encodeURIComponent(turl), {
        success: function(data) {
            //$('#main').html($(data).find('#main *'));
            ijfUtils.footLog("Successful data acquisition");
            //pause just a little for the initial rendering
            inContainer.innerHTML=data.results;

        },
        error: function(e) {

            if(e.statusText=="OK")
            {
                ijfUtils.footLog("Successful data acquisition");
                //lose html
                inContainer.innerHTML=e.responseText;
            }
            else
            {
                ijfUtils.footLog("Failed data acquisition: " + dataSource + " "  + e.statusText);

                //pause just a little for the initial rendering
                inContainer.innerHTML="Failed data acquisition";
            }
        }
    });
}
};

