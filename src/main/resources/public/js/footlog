Ext.define('SimpleLink', {
    extend: 'Ext.Component',
    alias: 'widget.simplelink',
    baseCls: Ext.baseCSSPrefix + 'simplelink',
    autoEl: {
        tag: 'a',
        href: '#'
    },
    renderTpl: '{text}',
    initComponent: function() {
        this.renderData = {
            text: this.text
        };
        this.callParent(arguments);
    },
    afterRender: function() {
        this.mon(this.getEl(), 'click', this.handler, this);
    },
    handler: Ext.emptyFn
});

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var ijfUtils = {
 pWin:null,
 dWin:null,
 dWinVal:false,
	getJiraIssueSync:function(inKey)
	{
		ijfUtils.footLog("Calling get issue for " + inKey);
		var retData = null;
		jQuery.ajax({
			async: false,
			type: 'GET',
			url: g_root + '/rest/api/2/issue/' + inKey,
			timeout: 60000,
			success: function(data) {
				retData = data;
			},
			error: function(e) {
				ijfUtils.footLog("Failed cache data set!");
				if(e.responseText)
				{
					retData = "Failed issue get: " + e.responseText;
				}
				else
				{
					retData = "Failed issue get: " + e.message;
				}
			}
		});
		return retData;
	},
	getJiraIssue:function(inKey, onSuccess, onError)
	{
		ijfUtils.footLog("Calling get issue for " + inKey);
		var retData = null;
		jQuery.ajax({
			async: true,
			type: 'GET',
			url: g_root + '/rest/api/2/issue/'+inKey+'/editmeta',
			timeout: 60000,
			success: onSuccess,
			error: onError
		});
	},
	getJiraIssueMetaSync:function(inKey)
	{
		ijfUtils.footLog("Calling get issue for " + inKey);
		var retData = null;
		jQuery.ajax({
			async: false,
			type: 'GET',
			url: g_root + '/rest/api/2/issue/'+inKey+'/editmeta',
			timeout: 60000,
			success: function(data) {
				retData = data;
			},
			error: function(e) {
				ijfUtils.footLog("Failed meta get set!");
				retData = "Failed meta get: " + e.message;
			}
		});
		return retData;
	},
	getJiraIssueMeta:function(inKey, onSuccess, onError)
	{
		ijfUtils.footLog("Calling get issue for " + inKey);
		var retData = null;
		jQuery.ajax({
			async: true,
			type: 'GET',
			url: g_root + '/rest/api/2/issue/' + inKey,
			timeout: 60000,
			success: onSuccess,
			error: onError
		});
	},
	getJiraCommentsSync:function(inKey)
	{
		ijfUtils.footLog("Calling get fields");
		var retData = null;
		jQuery.ajax({
			async: false,
			type: 'GET',
			url: g_root + '/rest/api/2/issue/' + inKey + '/comment',
			timeout: 60000,
			success: function(data) {
				retData = data;
			},
			error: function(e) {
				ijfUtils.footLog("Failed cache fields set!");
				retData = "Failed field get: " + e.message;
			}
		});
		return retData;
	},
	getJiraComments:function(inKey, onSuccess, onError)
	{
		ijfUtils.footLog("Calling get fields");
		var retData = null;
		jQuery.ajax({
			async: true,
			type: 'GET',
			url: g_root + '/rest/api/2/issue/' + inKey + '/comment',
			timeout: 60000,
			success: onSuccess,
			error: onError
		});
	},
	getJiraFieldsSync:function(inKey)
	{
		ijfUtils.footLog("Calling get fields");
		var retData = null;
		jQuery.ajax({
			async: false,
			type: 'GET',
			url: g_root + '/rest/api/2/field',
			timeout: 60000,
			success: function(data) {
				retData = data;
			},
			error: function(e) {
				ijfUtils.footLog("Failed cache fields set!");
				retData = "Failed field get: " + e.message;
			}
		});
		return retData;
	},
	getJiraFields:function(onSuccess, onError)
	{
		ijfUtils.footLog("Calling get fields");
		var retData = null;
		jQuery.ajax({
			async: true,
			type: 'GET',
			url: g_root + '/rest/api/2/field',
			timeout: 60000,
			success: onSuccess,
			error: onError
		});
	},
    saveJiraFormSync:function(inJson,ijfAction){
		var retVal = "";

		var outJson = inJson.replace(/\%/g,"~pct~");

		jQuery.ajax({
				async: false,
				type: 'POST',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					jsonConfig: outJson,
					action: ijfAction
				},
				timeout: 60000,
				success: function(data) {
				ijfUtils.hideProgress();

					ijfUtils.footLog("POST form data response: " + data);
					try{
					    var jRet = JSON.parse(data);
				    }
				    catch(e)
				    {
						jRet = {status:data};
					}
					if(jRet.status=="OK")
					{
						if(jRet.result)
						{
							retVal=jRet.result;
						}
						else
						{
							retVal = "OK";
						}
					}
					else
					{
						retVal = "Failed to save " + jRet.status;
					}
				},
				error: function(e) {
					ijfUtils.footLog("Failed init data set! " + e.message);
					retVal = "Failed to save " + e.message;
				}
			});
			return retVal;
		},
     getGroupMembers:function(inGroupName,inSuccess,inError){
		jQuery.ajax({
				async: true,
				type: 'GET',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					groupName: inGroupName,
					ijfAction: 'getGroupMembers'
				},
				timeout: 60000,
				success: inSuccess,
				error: inError
			});
		},

     getGroupMembersSync:function(inGroupName){
		var retVal = "";
		jQuery.ajax({
				async: false,
				type: 'GET',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					groupName: inGroupName,
					ijfAction: 'getGroupMembers'
				},
				timeout: 60000,
				success: function(data) {
						retVal=data;
				},
				error: function(e) {
					ijfUtils.footLog("Failed group member get: " + e.message);
					retVal = "Failed get get group members " + e.message;
				}
			});
			return retVal;
		},
     copyAttachments:function(inIssueKey,inAttList,inSuccess,inError){
		jQuery.ajax({
				async: true,
				type: 'GET',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					attachments: inAttList,
					toIssueKey: inIssueKey,
					ijfAction: 'copyIssueAttachments'
				},
				timeout: 60000,
				success: inSuccess,
				error: inError
			});
		},
     copyAttachmentsSync:function(inIssueKey,inAttList){
		var retVal = "";
		jQuery.ajax({
				async: false,
				type: 'GET',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					attachments: inAttList,
					toIssueKey: inIssueKey,
					ijfAction: 'copyIssueAttachments'
				},
				timeout: 60000,
				success: function(data) {
						retVal=data;
				},
				error: function(e) {
					ijfUtils.footLog("Failed group member get: " + e.message);
					retVal = "Failed get get group members " + e.message;
				}
			});
			return retVal;
		},
     sendEmail:function(inTargets,inSubject,inBody,inHtml,inSuccess,inError,inAttachments){
		jQuery.ajax({
				async: true,
				type: 'POST',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					targets: inTargets,
					subject: inSubject,
					body: inBody,
					html: inHtml, //true or false
					action: 'sendMail',
					attachments: inAttachments
				},
				timeout: 60000,
				success: inSuccess,
				error: inError
			});
		},
     sendEmailSync:function(inTargets,inSubject,inBody,inHtml,inAttachments){
		var retVal = "";
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					targets: inTargets,
					subject: inSubject,
					body: inBody,
					html: inHtml, //true or false
					action: 'sendMail',
					attachments: inAttachments
				},
				timeout: 60000,
				success: function(data) {
				ijfUtils.hideProgress();

					ijfUtils.footLog("Send email form data response: " + data);
					if(data=="sent")
					{
						retVal=data;
					}
					else
					{
						retVal = "Failed to send " + data;
					}
				},
				error: function(e) {
					ijfUtils.footLog("Failed email sendt! " + e.message);
					retVal = "Failed to send " + e.message;
				}
			});
			return retVal;
		},
     getProxyCall:function(inUrl,inMethod,inData,inContentType,inSuccess,inError){
			jQuery.ajax({
				async: true,
				type: 'POST',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					url: encodeURI(inUrl),
					method: inMethod,
					data: inData,
					contenttype: inContentType,
					action: 'proxyCall'
				},
				timeout: 60000,
				success: inSuccess,
				error: inError
			});
		},
     getProxyCallSync:function(inUrl,inMethod,inData,inContentType,inSessionKey){
			var retVal = "";
			jQuery.ajax({
				async: false,
				type: 'POST',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					url: encodeURI(inUrl),
					method: inMethod,
					data: inData,
					contenttype: inContentType,
					sessionKey: inSessionKey,
					action: 'proxyCall'
				},
				timeout: 60000,
				success: function(data) {
				ijfUtils.hideProgress();

					ijfUtils.footLog("URL data aquired: " + inUrl);
					retVal=data;
				},
				error: function(e) {
					ijfUtils.footLog("Failed proxy call " + e.message);
					retVal = "Failed proxy call " + e.message;
				}
			});
			return retVal;
		},
     getProxyApiCall:function(inUrl,formSetId,inSuccess,inError){
			jQuery.ajax({
				async: true,
				type: 'GET',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					url: encodeURI(inUrl),
					formSetId: formSetId,
					ijfAction: 'proxyApiCall'
				},
				timeout: 60000,
				success: inSuccess,
				error: inError
			});
		},
     getProxyApiCallSync:function(inUrl,formSetId){
			var retVal = "";
			jQuery.ajax({
				async: false,
				type: 'GET',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					url: encodeURI(inUrl),
					formSetId: formSetId,
					ijfAction: 'proxyApiCall'
				},
				timeout: 60000,
				success: function(data) {
				ijfUtils.hideProgress();

					ijfUtils.footLog("URL data aquired: " + inUrl);
					retVal=data;
				},
				error: function(e) {
					ijfUtils.footLog("Failed proxyapi call! " + e.message);
					retVal = "Failed to send " + e.message;
				}
			});
			return retVal;
		},
	getFieldDef:function(issueKey, inFieldName)
		{
			if(inFieldName=="Status")
			{
				return {
					jiraMeta: ijf.currentItem.transitions,
					jiraField: ijf.jiraFieldsKeyed[inFieldName]
				}
			}
			else
			{
				return {
					jiraMeta: ijf.jiraMetaKeyed[inFieldName],
					jiraField: ijf.jiraFieldsKeyed[inFieldName]
				}
			}
		},
   jiraApiSync:function(inMethod, inApi, inData){

     	var retVal="tbd";

     	jQuery.ajax({
			     headers: {Accept: "application/json"},
                 async: false,
                 type: inMethod,
                 contentType:"application/json; charset=utf-8",
                 url: g_root + inApi,
                 data: inData,
                 timeout: 60000,
             success: function(data,e,f) {
                 ijfUtils.footLog("Successful data response code: " + f.status);
                 if((f.status==200) || (f.status==201) || (f.status==204))
                 {
					 if((this.type=="GET") || (this.type=="POST")) retVal=data;
					 else
						 retVal="OK";
				 }
				 else
				 {
					 retVal="Unsuccessful Api Call: " + f.status;
				 }
             },
             error: function(e) {
				 if((e.status==201) || (e.status==200)) //  && (e.statusText=="Created"))
                 {
					 retVal="OK";
				 }
				 else if(e.statusText=="OK")
                 {
                     ijfUtils.footLog("Successful data post");
                     retVal=e.responseText;
                 }
                 else
                 {
                     ijfUtils.footLog("Failed data post: " + " "  + e.statusText);
                     if(e.status==403)
                     {
	                     retVal="You do not have permission to edit.";
					 }
					 else
					 {
	                     retVal="Failed data put: " + e.statusText + " " + e.responseText;
					 }
                 }
             }
        });
		return retVal;
   },
   jiraApi:function(inMethod,inApi, inData, onSuccess, onError){

     	var retVal="tbd";
     	jQuery.ajax({
                 async: true,
                 type: inMethod,
                 contentType:"application/json; charset=utf-8",
                 url: g_root + inApi,
                 data: inData,
                 timeout: 60000,
             success: onSuccess,
             error: onError
        });
},
getSharepointIssueFiles: function(inIssueId)
{
	var resMessage = "";
	//save the form, update the message at bottom....
	var params = [];
	params.push(window.location.hostname.split(".")[0]);
	params.push(inIssueId);
	try
	{
	    //perform post
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: '/plugins/servlet/maxjiraspapi',
				data: {
					action: "run",
					msamethod: "EnumerateAttachments",
					msadata: params.join(",")
				},
				timeout: 60000,
				success: function(data) {
				    resMessage=data;

				},
				error: function(e) {
					resMessage = "Failed to run " + e.message;
				}
			});


    }
    catch(e)
    {
		resMessage = e.message;
    }
    //window.setTimeout(msaClearMessage,8000);
    return resMessage;
},
getSharepointIssueFileVersions: function(inIssueId,inFileName)
{
	var resMessage = "";
	//save the form, update the message at bottom....
	var params = [];
	params.push(window.location.hostname.split(".")[0]);
	params.push(inIssueId);
	params.push(inFileName);
	try
	{
	    //perform post
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: '/plugins/servlet/maxjiraspapi',
				data: {
					action: "run",
					msamethod: "GetAttachmentHistory",
					msadata: params.join(",")
				},
				timeout: 60000,
				success: function(data) {
				    resMessage=data;
				},
				error: function(e) {
					resMessage = "Failed to run " + e.message;
				}
			});
    }
    catch(e)
    {
		resMessage = e.message;
    }
    //window.setTimeout(msaClearMessage,8000);
    return resMessage;
},
copySpFilesToJira: function(inFileNames,inIssueId)
{
	var resMessage = "";
	//save the form, update the message at bottom....
	var siteName = window.location.hostname.split(".")[0];
	try
	{
	    //perform post
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: '/plugins/servlet/maxjiraspapi',
				data: {
					action: "copytojira",
					sitename: siteName,
					key: inIssueId,
					attachments: inFileNames,
				},
				timeout: 60000,
				success: function(data) {
					if(data.status=="success")
						resMessage="OK";
					else
						resMessage=data.message;
				},
				error: function(e) {
					resMessage = "Failed to run " + e.message;
				}
			});
    }
    catch(e)
    {
		resMessage = e.message;
    }
    //window.setTimeout(msaClearMessage,8000);
    return resMessage;
},
copyJiraFilesToSp: function(inFileIds,inIssueId)
{
	var resMessage = "";
	//save the form, update the message at bottom....
	var siteName = window.location.hostname.split(".")[0];
	try
	{
	    //perform post
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: '/plugins/servlet/maxjiraspapi',
				data: {
					action: "copytosharepoint",
					sitename: siteName,
					key: inIssueId,
					attachments: inFileIds,
				},
				timeout: 60000,
				success: function(data) {
					if(data.status=="success")
						resMessage="OK";
					else
						resMessage=data.message;
				},
				error: function(e) {
					resMessage = "Failed to run " + e.message;
				}
			});
    }
    catch(e)
    {
		resMessage = e.message;
    }
    //window.setTimeout(msaClearMessage,8000);
    return resMessage;
},
undoSpCheckout: function(inRawFile,inIssueId)
{
	var resMessage = "";
	//save the form, update the message at bottom....
	var params = [];
	params.push(window.location.hostname.split(".")[0]);
	params.push(inIssueId);
	params.push(inRawFile.FileName);
	try
	{
	    //perform post
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: '/plugins/servlet/maxjiraspapi',
				data: {
					action: "run",
					msamethod: "UndoCheckOut",
					msadata: params.join(",")
				},
				timeout: 60000,
				success: function(data) {
					if(data.status=="success")
						resMessage="OK";
					else
						resMessage=data.message;
				},
				error: function(e) {
					resMessage = "Failed to run " + e.message;
				}
			});

    }
    catch(e)
    {
		resMessage = e.message;
    }
    //window.setTimeout(msaClearMessage,8000);
    return resMessage;
},
checkOutSpFile: function(inRawFile,inIssueId)
{
	var resMessage = "";
	//save the form, update the message at bottom....
	var params = [];
	params.push(window.location.hostname.split(".")[0]);
	params.push(inIssueId);
	params.push(inRawFile.FileName);
	try
	{
	    //perform post
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: '/plugins/servlet/maxjiraspapi',
				data: {
					action: "run",
					msamethod: "CheckOutAttachment",
					msadata: params.join(",")
				},
				timeout: 60000,
				success: function(data) {
					if(data.status=="success")
						resMessage="OK";
					else
						resMessage=data.message;
				},
				error: function(e) {
					resMessage = "Failed to run " + e.message;
				}
			});

    }
    catch(e)
    {
		resMessage = e.message;
    }
    //window.setTimeout(msaClearMessage,8000);
    return resMessage;
},
checkInSpFile: function(inRawFile,inIssueId,inComment)
{
	var resMessage = "";
	//save the form, update the message at bottom....
	var params = [];
	params.push(window.location.hostname.split(".")[0]);
	params.push(inIssueId);
	params.push(inRawFile.FileName);
	params.push(inComment);
	try
	{
	    //perform post
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: '/plugins/servlet/maxjiraspapi',
				data: {
					action: "run",
					msamethod: "CheckInAttachment",
					msadata: params.join(",")
				},
				timeout: 60000,
				success: function(data) {
					if(data.status=="success")
						resMessage="OK";
					else
						resMessage=data.message;
				},
				error: function(e) {
					resMessage = "Failed to run " + e.message;
				}
			});

    }
    catch(e)
    {
		resMessage = e.message;
    }
    //window.setTimeout(msaClearMessage,8000);
    return resMessage;
},
deleteSpFile: function(inRawFile,inIssueId)
{
	var resMessage = "";
	//save the form, update the message at bottom....
	var params = [];
	params.push(window.location.hostname.split(".")[0]);
	params.push(inIssueId);
	params.push(inRawFile.FileName);
	try
	{
	    //perform post
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: '/plugins/servlet/maxjiraspapi',
				data: {
					action: "run",
					msamethod: "DeleteAttachment",
					msadata: params.join(",")
				},
				timeout: 60000,
				success: function(data) {
					if(data.status=="success")
						resMessage="OK";
					else
						resMessage=data.message;
				},
				error: function(e) {
					resMessage = "Failed to run " + e.message;
				}
			});

    }
    catch(e)
    {
		resMessage = e.message;
    }
    //window.setTimeout(msaClearMessage,8000);
    return resMessage;
},
getSpFileData:function(inIssueId, att) {
        var resMessage = "";
        var resultObj;
        //save the form, update the message at bottom....
        var params = [];
        params.push(window.location.hostname.split(".")[0]);
        params.push(inIssueId);
        params.push(att.FileName);
        params.push(att.VersionLabel);
        //version number?
        //params.push(inComment);
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiraspapi',
                data: {
                    action: "run",
                    msamethod: "GetAttachmentData",
                    msadata: params.join(",")
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                        resMessage = "OK";
                        resultObj = data.result;
                    } else {
                        resMessage = data.message;
                    }
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        //window.setTimeout(msaClearMessage,8000);
        return resultObj;
    },
renameSpFile:function(inIssueId, oldFileName, newFileName) {
        var resMessage = "";
        var resultObj;
        //save the form, update the message at bottom....
        var params = [];
        params.push(window.location.hostname.split(".")[0]);
        params.push(inIssueId);
        params.push(oldFileName);
        var newFName = ijfUtils.sharepointFilenameClean(newFileName);
        params.push(newFName);
        //version number?
        //params.push(inComment);
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiraspapi',
                data: {
                    action: "run",
                    msamethod: "RenameAttachment",
                    msadata: params.join(",")
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                        resMessage = "OK";
                        resultObj = data.result;
                    } else {
                        resMessage = data.message;
                    }
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        return resMessage;
    },
uploadSpFile: function(inIssueId, inFileName, inBase64)
{
	//you are going to UPLOAD a file to sharepoint here.....

	  var params = [];
	  params.push(window.location.hostname.split(".")[0]);
	  params.push(inIssueId);
	  params.push(inFileName);
	  params.push(inBase64);

        //version number?
        //params.push(inComment);
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiraspapi',
                data: {
                    action: "run",
                    msamethod: "UploadOrUpdateAttachment",
                    msadata: params.join(",")
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                        resMessage = "OK";
                        resultObj = data.result;
                    } else {
                        resMessage = data.message;
                    }
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        return resMessage;
},
runSharepointMethod: function(inMethod,inData)
{
	var resMessage = "";
	//save the form, update the message at bottom....
	try
	{
	    //perform post
		jQuery.ajax({
				async: false,
				type: 'POST',
				url: '/plugins/servlet/maxjiraspapi',
				data: {
					action: "run",
					msamethod: inMethod,
					msadata: inData
				},
				timeout: 60000,
				success: function(data) {
				    resMessage=data;

				},
				error: function(e) {
					resMessage = "Failed to run " + e.message;
				}
			});
    }
    catch(e)
    {
		resMessage = e.message;
    }
    //window.setTimeout(msaClearMessage,8000);
    return resMessage;
},
/***************************************
     begin MDS methods
****************************************/
generateDocumentAsync: function(inJobKey, inDocumentMaster, inDocumentSections, inIssueKey)
{
        var resMessage = "";
        var resultObj;
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "GenerateDocumentAsynch",
                    jobkey: inJobKey,
                    jobmaster: inDocumentMaster,
                    jobsections: inDocumentSections,
                    issuekey: inIssueKey
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                        resMessage = "OK";
                        resultObj = data.result;
                    } else {
                        resMessage = data.message;
                    }
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                    return resMessage;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        return resultObj;
},
getAyncDocumentStatus: function(inJobKey)
{
        var resMessage = "";
        var resultObj;
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "GetAsyncDocumentStatus",
                    jobkey: inJobKey
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                        resMessage = "OK";
                        resultObj = data.result;
                    } else {
                        resMessage = data.message;
                    }
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                    return resMessage;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        return resultObj;
},
removeAyncDocumentJob: function(inJobKey)
{
        var resMessage = "";
        var resultObj;
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "RemoveAyncDocumentJob",
                    jobkey: inJobKey
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                        resMessage = "OK";
                        resultObj = data.result;
                    } else {
                        resMessage = data.message;
                    }
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                    return resMessage;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        return resultObj;
},
acceptWordChanges: function(inFileName, inInsertionKey, inBase64)
{
        var resMessage = "";
        var resultObj;
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "AcceptChanges",
                    filename: inFileName,
                    insertionkey: inInsertionKey,
                    filedata: inBase64
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                        resMessage = "OK";
                        resultObj = data.result;
                    } else {
                        resMessage = data.message;
                    }
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                    return resMessage;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        return resultObj;
},
uploadMdsFile: function(inJobKey, inFileName, inInsertionKey, inBase64)
{
        var resMessage = "";
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "UploadDocument",
                    jobkey: inJobKey,
                    filename: inFileName,
                    insertionkey: inInsertionKey,
                    filedata: inBase64
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                         if(data.result.stringvalue=="")
                        {
							resMessage="OK";
						}
						else
						{
							resMessage = data.message;
						}
                    }
                    else
                    {
						resMessage = data.message;
					}
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        return resMessage;
},
assembleMdsDocument: function(inJobKey, inTemplateFileName, inTemplateData)
{
        var resMessage = "";
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "AssembleDocument",
                    jobkey: inJobKey,
                    templatefilename: inTemplateFileName,
                    templatedata: inTemplateData
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                         if(data.result.stringvalue=="")
                        {
							resMessage="OK";
						}
						else
						{
							resMessage = data.result.stringvalue;
						}
                    }
                    else
                    {
						resMessage = data.message;
					}
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        return resMessage;
},
cleanupMdsAssembly: function(inJobKey)
{
        var resMessage = "";
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "CleanupAssembly",
                    jobkey: inJobKey
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                         if(data.result.stringvalue=="")
                        {
							resMessage="OK";
						}
						else
						{
							resMessage = data.message;
						}
                    }
                    else
                    {
						resMessage = data.message;
					}
                },
                error: function(e) {
                    resMessage = "Failed to run " + e.message;
                }
            });

        } catch (e) {
            resMessage = e.message;
            return resMessage;
        }
        return resMessage;
},
getMdsAssemblyDocuments: function(inJobKey)
{
		var resMessage ="";
        var resObj;
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "GetAssemblyDocuments",
                    jobkey: inJobKey
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
						resObj= data.result;
                    }
                    else
                    {
						resObj = data.message;
					}
                },
                error: function(e) {
                    resObj = "Failed to run " + e.message;
                }
            });

        } catch (e) {
            resObj = e.message;
        }
        return resObj;
},
getMdsAssemblyResultData: function(inJobKey, inOffset, inLength)
{
		var resObj = null;
        var resMessage = "";
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "GetAssemblyResultData",
                    jobkey: inJobKey,
                    offset: inOffset,
                    length: inLength
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                         resObj= data.result;
                    }
                    else
                    {
						resObj = data.message;
					}
                },
                error: function(e) {
                    resObj = "Failed to run " + e.message;
                }
            });

        } catch (e) {
            resObj = e.message;
        }
        return resObj;
},
getMdsAssemblyStatus: function(inJobKey)
{
		var resObj = null;
        var resMessage = "";
        try {
            //perform post
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: '/plugins/servlet/maxjiramdsapi',
                data: {
                    action: "GetAssemblyStatus",
                    jobkey: inJobKey
                },
                timeout: 60000,
                success: function(data) {
                    if (data.status == "success") {
                      resObj = data.result;
					}
                },
                error: function(e) {
                    resObj = "Failed to run " + e.message;
                }
            });

        } catch (e) {
            resObj = e.message;
        }
        return resObj;
},
/*********************
  END MDS
*********************/
updateJiraFieldValue: function(inFieldKey, inValue, inItem) {
        //update the issue and the local item

        var tIssue = {};
        tIssue.key = inItem.key;
        tIssue.fields = {};
        tIssue.fields[inFieldKey] = inValue;
        var jData = JSON.stringify(tIssue);
        var tApi = "/rest/api/2/issue/" + inItem.key;
        var saveRes = ijfUtils.jiraApiSync("PUT", tApi, jData);
        return saveRes;
    },
getCurrentUserId: function()
{
	//BAD, depends on idmUtils.....
	var retId = "tbd";
	var userId = ijf.main.currentUser.id;
	if(userId)
	{
		if(userId.indexOf("@")>-1)
		{
			if(!ijf.main.currentUser.maxId)
			{
				var uDetails = ijf.snippets.idmUtils.getUserDetails(ijf.main.currentUser.id);
				if(uDetails.maxId) ijf.main.currentUser.maxId = uDetails.maxId;
			}
			retId = ijf.main.currentUser.maxId;
		}
		else
		{
			retId=userId;
		}
	}
	return retId;
},
loadIssueTypeDetails:function(projectKey)
{
	if(!ijf.jiraAddMeta.hasOwnProperty(projectKey))
	{
		//get the create meta for all issue types of the project.  project key
		//each will be keyed fields by issue type...
		ijf.jiraAddMeta[projectKey] = [];
		ijf.jiraAddMetaKeyed[projectKey] = [];
		var rawMeta = ijfUtils.jiraApiSync("GET",'/rest/api/2/issue/createmeta',"expand=projects.issuetypes.fields&projectKeys="+projectKey);
		rawMeta.projects[0].issuetypes.forEach(function(it){

			ijf.jiraAddMeta[projectKey][it.name]=it.fields;
			var fieldsKeyed = [];
			Object.keys(it.fields).forEach(function(fk){
				var f = it.fields[fk];
				fieldsKeyed[f.name]=f;
			});
			ijf.jiraAddMetaKeyed[projectKey][it.name]=fieldsKeyed;
		});
	}
},
loadJiraFields:function()
{
	if(!ijf.jiraFields)
	{
		ijf.jiraFields = ijfUtils.getJiraFieldsSync();
		ijf.jiraFieldsKeyed = [];
		ijf.jiraFieldsIdKeyed = [];
		ijf.jiraFields.forEach(function(f)
		{
			ijf.jiraFieldsKeyed[f.name]=f;
			ijf.jiraFieldsIdKeyed[f.id]=f;
		});
		ijf.jiraFieldsKeyed["Parent"]={"id":"parent","name":"Parent","schema":{"type":"parent"}};
		ijf.jiraFieldsIdKeyed["parent"]={"id":"parent","name":"Parent","schema":{"type":"parent"}};
	}
},
///////////END JIRA UTILS
messageHandler:function(event)
{
    /*message syntax is:
        {
        action:  showItemSelector | showItemForm |  copyItemToCategory
        itemId: number
        formId: string
        sourceCategoryId: number
        targetCategoryId: number
        newName: string
        }
     */
        ijfUtils.footLog("Received message from: " + event.origin);

        //post ack
        event.source.postMessage("received",event.origin);

        //set attention
        var i = 0;
        var show = ['******************',document.title];
        function stop(){
            clearInterval(focusTimer);
            document.title = show[1];
        }
        onfocus = function() {
            stop();
            onfocus=null;
        }
        var focusTimer = setInterval(function(){
            document.title = show[i++ % 2];
            window.focus();
        },500);


        if(!event.data.action)
        {
            ijfUtils.footLog("No action provided");
            return;
        }
        switch(event.data.action) {
            case 'showItemForm':

                var thisForm = ijf.fw.forms[event.data.formId];
                if(thisForm==null)
                {
                    ijfUtils.footLog("messageHandler: Unable to find form " +event.data.formId) ;
                    return;
                }
                ijfUtils.footLog("messageHandler: navigating to form item");
                if(window.onbeforeunload==null)
                {
                    g_formId=event.data.formId;
                    ijf.main.itemId = event.data.itemId;
                    ijfUtils.clearAll();
                    if(!ijf.currentItem)
                    {
                        ijf.main.processSetup("ijfContent");
                    }
                    else
                    {
                        if(ijf.currentItem.key == event.data.itemId)
                        {
                            ijf.main.renderForm("ijfContent", g_formId, false, ijf.currentItem);
                        }
                        else
                        {
                            ijf.currentItem=null;
                            ijf.main.processSetup("ijfContent");
                        }
                    }
                }
                else
                {
                    var dFunc = function(){
                        window.onbeforeunload= null;
						g_formId=event.data.formId;
						ijf.main.itemId = event.data.itemId;
						ijfUtils.clearAll();
						if(!ijf.currentItem)
						{
							ijf.main.processSetup("ijfContent");
						}
						else
						{
							if(ijf.currentItem.key == event.data.itemId)
							{
								ijf.main.renderForm("ijfContent", g_formId, false, ijf.currentItem);
							}
							else
							{
								ijf.currentItem=null;
								ijf.main.processSetup("ijfContent");
							}
						}
                    };
                    ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
                }
                break;
            default:
                ijfUtils.footLog("no message action for: " + event.data.action);
        }
},
simpleSave:function()
{
	var onSuccessSave = function()
	{
		ijfUtils.hideProgress();
		if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
		ijf.main.setAllClean();
		ijf.main.resetForm();
	};
	Ext.getBody().mask("Saving...");
	var saveIt = function(){ijf.main.saveForm(onSuccessSave,null,ijf.main.outerForm,ijf.currentItem)};
	window.setTimeout(saveIt,50);
},
simpleSaveQuiet:function()
{
	var onSuccessSave = function()
	{
		ijf.main.setAllClean();
	};
	var saveIt = function(){ijf.main.saveForm(onSuccessSave,null,ijf.main.outerForm,ijf.currentItem)};
	window.setTimeout(saveIt,50);
},
getPermissionObj:function(inPerms,inItem,inUser)
{
	var retObj = {"canEdit":true,"canSee":true};
	if(inItem)
	{
		if(inPerms)
		{
			if(!inPerms.enabled) return retObj;
			var cStatus = inItem.fields.status.name;
			var uGroups = inUser.groupList;
			if(!uGroups) uGroups=[];
			retObj.canSee = false;
			retObj.canEdit = false;
			//Do edit and view in order
			if(inPerms.states.hasOwnProperty(cStatus))
			{
				var perms = inPerms.states[cStatus];
				if(uGroups.reduce(function(inVal,g){if(perms.edit.indexOf(g)>-1) return true; return inVal;	},false))
				{
					retObj.canEdit=true;
				}
			}
 			//now VIEW
			if(inPerms.states.hasOwnProperty(cStatus))
			{
				var perms = inPerms.states[cStatus];
				if(uGroups.reduce(function(inVal,g){if(perms.view.indexOf(g)>-1) return true; return inVal;},false))
				{
					retObj.canSee = true;
				}
			}
		}
	}
	if(retObj.canEdit) retObj.canSee=true;
	return retObj;
},
applyStyle:function(element, style){
    Object.keys(style).forEach(function(key){
        element.style[key] = style[key];
    });
},
renderFormItem:function(inForm,inKey)
{
	ijfUtils.showProgress();
	var renderForm = function(){
		ijf.currentItem=null;
		ijf.main.itemId= inKey;
		window.g_formId=inForm;
		ijf.main.processSetup("ijfContent");
	}
    window.setTimeout(renderForm,50);
	return;
},
cssToJson: function (inStr) {

	var retJson = {};
	try
	{
 		var nvp = inStr.split(";");
 		for(var i =0; i< nvp.length; i++)
 		{
			var pr = nvp[i].split(":");
			retJson[pr[0].trim()]=pr[1];
		}
	}
	catch(e)
	{
		return {};
	}
	return retJson;
},


footLog:function(inMsg)
{

    if(ijf.main.debug=='true')
    {
        var tNow = Math.floor(Date.now() / 1000);

        jQuery('#ijfDebug').prepend("<br>"+tNow+"&nbsp;&nbsp"+inMsg);

        console.log(inMsg);
    }
},
applyVersionHistory:function(inId)
{
	ijfUtils.clearExt();
	ijf.main.init(inId);
	ijfUtils.modalDialogMessage("RECOVERY","You have loaded a MEMORY ONLY configuration version.  To apply this configuration you must Download the configuration, then upload the configuration.");
},
showSaveHistory:function()
{
	var tDiv = document.getElementById('ijfJsonUpload');
	var saveHistory = ijfUtils.jiraApiSync("GET","/plugins/servlet/iforms","ijfAction=getVersions");
	var saveData = JSON.parse(saveHistory);
	var TblStart = "<table><tr><td>User</td><td>Date</td><td>Click to Apply</td></tr>";
	var outStr = saveData.resultSet.reduce(function(bStr, s){
		if(!s.author) return bStr;
		bStr+= "<tr><td>"+s.author +"</td><td>" + s.created + "</td><td><a href=JAVASCRIPT:ijfUtils.applyVersionHistory("+s.id+")>Click to apply "+s.id+"</a></td></tr>";
		return bStr;
	},TblStart);
	outStr += "</table>";
	tDiv.innerHTML = outStr;
},
renderAdminButtons:function(inContainerId)
{
    //todo if owner manager do this...
    jQuery('#ijfManage').html('');
    jQuery('#ijfJsonUpload').html('');

    if((ijf.main.debug=='true') && (!ijf.main.outerForm))
    {
        //Craft section, if debug or if in craft mode...
		var fileLoad = "View Save History(last 20): <input type='button' value='Save History' onclick='ijfUtils.showSaveHistory()'><br>";
		fileLoad += "Upload Entire Config File: <input type='file' accept='text/plain' onchange='ijfUtils.readConfigFile(event)'><br>";
		fileLoad += "Download Entire Config to a File: <input type='button' value='Download' onclick='ijfUtils.writeConfigFile()'>";
        var pnl = new Ext.FormPanel({
			layout:'vbox',
            items: [{
                html: "Idealfed Jira Forms Version = " + g_version,
                frame: false,
                border: false,
                xtype: "panel"},
                {html: fileLoad,
					frame: false,
					border: false,
					xtype: "panel"},
                ],
        });
      // ijf.main.controlSet['jsonUploadForm'] =   new itemControl('jsonUploadForm', null, null, jForm, null);
       ijf.main.controlSet['adminButtons'] =   new itemControl('jsonUploadForm', null, null, pnl, null);

      //  jForm.render(document.getElementById("ijfJsonUpload"));
        pnl.render(document.getElementById("ijfManage"));
    }
},
gridUploadCsvFile: function(event, inGridId, inControlId, dontSetDirty)
{
	var grid = Ext.getCmp(inGridId);
	if(!grid){ijfUtils.footLog("failed to get to grid with " + inGridId); return;}
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
	  var text = reader.result;
	  var rows = ijfUtils.CSVtoArray(text);
	  //for each row, load the data in the grid...
	  //skip first row assuming header....
	  var firstRow=true;
	  rows.forEach(function(r){
		   if(firstRow){
			   firstRow=false;
			   return;
		   }
		   if((r.length==1) & (r[0]=="")) return;
		   var newRecord = {id:Ext.id()};
		   var i = 0;
			grid.store.ijfCols.forEach(function(col){
				if(!r[i])
				{
					if(col.columnName)
						newRecord[col.columnName]=col["default"];
					else
						newRecord[col] = "";
				}
				else
				{
					if(col.columnName)
						newRecord[col.columnName] = r[i];
					else
						newRecord[col] = r[i];
				}
				i++;
			});
			//set values by the order....
			 var position = grid.store.getCount();
			 grid.store.insert(position, newRecord);
	  });
	  if(!dontSetDirty) ijf.main.controlChanged(inControlId);
	};
	reader.readAsText(input.files[0]);

},
gridSpUploadFile: function(event, inGridId, inControlId, inIssueId)
{

	//you are going to UPLOAD a file to sharepoint here.....

    ijfUtils.showProgress();

	var grid = Ext.getCmp(inGridId);
	if(!grid){ijfUtils.footLog("failed to get to grid with " + inGridId); return;}
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
	  var binFile = reader.result;
	  var base64 = ijfUtils.Base64Binary.arrayBufferToBase64(binFile);

	  var params = [];
	  params.push(window.location.hostname.split(".")[0]);
	  params.push(inIssueId);
	  params.push(thisFileName);
	  params.push(base64);

	  var fSave = ijfUtils.runSharepointMethod("UploadOrUpdateAttachment",params.join(","));
	  ijfUtils.hideProgress();
	  if(fSave.status=="error")
	  {
		  ijfUtils.modalDialogMessage("Error saving",fSave.message);
	  }
	  else if(fSave.status=="success")
	  {
		  //perform simple save here...it will skip if nothing to save...i think
		  if(ijf.main.allControlsClean())
			  ijf.main.resetForm();
		  else
			  ijfUtils.simpleSave();

	  }
	  else
	  {
		  ijfUtils.modalDialogMessage("Error saving",fSave);
	  }
	  //now upload the file to Sharepoint.....

	};
	var thisFileName = input.files[0].name;
	thisFileName = ijfUtils.sharepointFilenameClean(thisFileName);
	reader.readAsArrayBuffer(input.files[0]);

},
writeCustomType:function(inCustomType)
{
	var outStr = ijfUtils.getCustomTypeJson(inCustomType);
	var blob = new Blob([outStr], {type: "text/plain;charset=utf-8"});
	saveAs(blob,inCustomType.name +".json");
},
getCustomTypeJson:function(inCustomType)
{
	var outType = {
			customTypeId: inCustomType.id,
			name: inCustomType.name,
			description: inCustomType.description,
			customType: inCustomType.customType,
			fieldName: inCustomType.fieldName,
			settings: JSON.stringify(inCustomType.settings)};
	return JSON.stringify(outType);
},
readBinaryFile:function(event, onLoadHandler)
{
	var input = event.target;
	var reader = new FileReader();
	if(ijf.main.callbacks.hasOwnProperty(onLoadHandler))
	reader.onload = ijf.main.callbacks[onLoadHandler];
	reader.readAsArrayBuffer(input.files[0]);
},
readJiraGroupsConfigFile:function(event)
{
	   //this must be a txt file, if not...bail....
	   if(event.target.files[0].name.indexOf(".txt")<0)
	   {
	   		ijfUtils.modalDialogMessage("Error","Sorry, only txt files can be imported, with a single column of group names.");
		   return;
	   }

	    var input = event.target;

	    var reader = new FileReader();
	    reader.onload = function(){
	      var text = reader.result;
	      ijfUtils.writeJiraGroupsConfig(reader.result, true);
	    };
  		reader.readAsText(input.files[0]);
},
writeJiraGroupsConfig:function(inConfig, doReset)
{
	try
	{
	   //the inConfig is a simple /n list of groups.  parse it and attempt to load each group....
	   var grps = inConfig.split("\n");

	   grps.forEach(function(g)
	   {
		    if(g.length<1) return;
		   //add the group to JIRA, IF it does not exist....
		    var jsonString = {};
		    jsonString.name=g.trim();
			var saveRes = ijfUtils.jiraApiSync("POST","/rest/api/2/group",JSON.stringify(jsonString));
			if(!saveRes.name)
			{
				console.log(g + " " + saveRes);
			}
			else
			{
				console.log(saveRes.name + " - group added");
			}

	   });
	   ijfUtils.modalDialogMessage("Information","Group list processed.");

	}
	catch(e)
	{
		ijfUtils.modalDialogMessage("Error","Sorry, failed to parse the type file. " + e.message);
	}

},
readTypeConfigFile:function(event)
{
	    var input = event.target;
	    var reader = new FileReader();
	    reader.onload = function(){
	      var text = reader.result;
	      ijfUtils.writeTypeConfig(reader.result, true);
	    };
  		reader.readAsText(input.files[0]);
},
writeTypeConfig:function(inConfig, doReset)
{
		var outJsonConfig = inConfig.replace(/\%/g,"~pct~");

	try
	{
	    var inType = JSON.parse(outJsonConfig);
	    //look for type by name.  If it is there, update it...else create a new....
	    if(!inType) { ijfUtils.modalDialogMessage("Error","Sorry, unable a type in the file"); return;}

		var thisT = null;
		for(var tF in ijf.fw.CustomTypes){
				if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
				if(ijf.fw.CustomTypes[tF].name==inType.name) thisT=ijf.fw.CustomTypes[tF];
		}

		if(thisT)
		{
			inType.id = thisT.id;
		}
		else
		{
			inType.id = 0;
		}
		//save the type to the server...

			var jOut = {
						customTypeId: inType.id,
						name: inType.name,
						description: inType.description,
						customType: inType.customType,
						fieldName: inType.fieldName,
						settings: inType.settings
			};
			var jdata = JSON.stringify(jOut);

			var sStat = ijfUtils.saveJiraFormSync(jdata,"saveCustomType");

			if(isNaN(sStat))
			{
				ijfUtils.modalDialogMessage("Save Error","Sorry, something went wrong with the save: " + sStat);
			}
			else
			{
				//update the custom type with this new one...list will refesh on focus
				if(!thisT)
				{
					inType.id=sStat;
					inType.settings= JSON.parse(inType.settings)
					ijf.fw.CustomTypes.push(inType);
				}
				else
				{
					//update the one in CustomTypes
					thisT.description= inType.description;
					thisT.customType= inType.customType;
					thisT.fieldName= inType.fieldName;
					thisT.settings= JSON.parse(inType.settings);
				}
				ijfUtils.modalDialogMessage("Informatoin","Type has been loaded");
			}

	}
	catch(e)
	{
		ijfUtils.modalDialogMessage("Error","Sorry, failed to parse the type file. " + e.message);
	}

},
writeConfigFile:function(inFormSet)
{
	var outStr = ijfUtils.getConfigJson(inFormSet);
	var blob = new Blob([outStr], {type: "text/plain;charset=utf-8"});
	if(inFormSet)
	{
		saveAs(blob,inFormSet +".json");
	}
	else
	{
		saveAs(blob,"ijfFormsConfig.json");
	}
},
readConfigFile:function(event)
{
	    var input = event.target;

	    var reader = new FileReader();
	    reader.onload = function(){
	      var text = reader.result;
	      ijfUtils.writeFullConfig(reader.result, true);
	    };
  		reader.readAsText(input.files[0]);
},
writeFullConfig:function(inConfig, doReset)
{
		var outJsonConfig = inConfig.replace(/\%/g,"~pct~");

	    var outConfig = '{"ijfConfig":'+outJsonConfig+'}';

	    var initResp = "";
	    jQuery.ajax({
				async: false,
				type: 'POST',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					jsonConfig: outConfig,
					action: "setConfig"
				},
				timeout: 60000,
				success: function(data) {

					//jQuery('#main').html(jQuery(data).find('#main *'));
					initResp= data;
					if((data.indexOf("Fail")>-1) || (data.indexOf("SESSION")>-1))
					{
						ijfUtils.footLog("Failed group load " + data);
						ijfUtils.modalDialogMessage("Error","Sorry there was a problem loading the form group: " + data);
						return;
					}
					else
					{
						ijfUtils.footLog("Success config data load: " + data);
						if(doReset)
						{
							ijfUtils.clearExt();
							ijf.main.init(0);
						}
					}
				},
				error: function(e) {

					ijfUtils.footLog("Failed init data set!");
					initResp= null;
				}
		});

},
readGroupConfigFile:function(event)
{
	    var input = event.target;
	    var reader = new FileReader();
	    reader.onload = function(){
	      var text = reader.result;
	      ijfUtils.writeGroupConfig(reader.result, true);
	    };
  		reader.readAsText(input.files[0]);
},
writeGroupConfig:function(inConfig, doReset)
{
		var outJsonConfig = inConfig.replace(/\%/g,"~pct~");

	    var outConfig = '{"ijfConfig":'+outJsonConfig+'}';

	    var initResp = "";
	    jQuery.ajax({
				async: false,
				type: 'POST',
				url: g_root + '/plugins/servlet/iforms',
				data: {
					jsonConfig: outConfig,
					action: "setGroupConfig"
				},
				timeout: 60000,
				success: function(data) {
					//jQuery('#main').html(jQuery(data).find('#main *'));
					initResp= data;
					if((data.indexOf("Fail")>-1) || (data.indexOf("SESSION")>-1))
					{
						ijfUtils.footLog("Failed group load " + data);
						ijfUtils.modalDialogMessage("Error","Sorry there was a problem loading the form group: " + data);
						return;
					}
					else
					{
						ijfUtils.footLog("Success load group data " + data);
						if(doReset)
						{
							ijfUtils.clearExt();
							ijf.main.init(0);
						}
					}
				},
				error: function(e) {

					ijfUtils.footLog("Failed init group data set!");
					initResp= null;
				}
		});

},
getConfigJson:function(inFormSet)
{
	var outFormSets = [];
	outFormSets = ijf.fw.formSets.reduce(function(outFormSets,fs)
	{
		if(!fs.name) return outFormSets;

		//if doing one form set...
		if((inFormSet) && (fs.name != inFormSet)) return outFormSets;

		var settingsOut = new Array();
		for(var j in fs.settings)
		{
			if(!fs.settings.hasOwnProperty(j)) continue;
			settingsOut.push({name:j,value:fs.settings[j],comment:""});
		};

		var outForms = [];
		var fsOut = {
			id: fs.id,
			name: fs.name,
			projectName: fs.projectName,
			projectId: fs.projectId,
			settings: JSON.stringify(JSON.stringify(settingsOut)),
			snippets: fs.snippets.map(function(s){
					return {
								name: s.name,
								snippet: JSON.stringify(s.snippet)
							};
			}),
			forms: fs.forms.reduce(function(outForms,thisForm){
					//process the Form
					if(!thisForm.name) return outForms;
					var settingsOut = new Array();
					var fieldsOut = new Array();
					for(var j in thisForm.settings)
					{
						if(!thisForm.settings.hasOwnProperty(j)) continue;
						settingsOut.push({name:j,value:thisForm.settings[j],comment:""});
					};
					for(var j in thisForm.fields)
					{
						if(!thisForm.fields.hasOwnProperty(j)) continue;
						fieldsOut.push(thisForm.fields[j]);
					};
					var jOut = {
						id: thisForm.id,
						testIssue: thisForm.testIssue,
						formType: thisForm.formType,
						issueType: thisForm.issueType,
						formAnon: thisForm.formAnon,
						name: thisForm.name,
						fields: JSON.stringify(JSON.stringify(fieldsOut)),
						formSettings: JSON.stringify(JSON.stringify(settingsOut))
					};
					outForms.push(jOut);
					return outForms;
			},outForms)
		}
		outFormSets.push(fsOut);
		return outFormSets;
	},outFormSets);


	//look for existance of specific formset, if NOT there, also get the custom types
	if(!inFormSet)
	{
			var outCustomTypes = ijf.fw.CustomTypes.reduce(function(outCustomTypes,ctype)
			{
				if(!ctype.name) return outCustomTypes;
				var ctOut = {
							customTypeId: ctype.id,
							name: ctype.name,
							description: ctype.description,
							customType: ctype.customType,
							fieldName: ctype.fieldName,
							settings: JSON.stringify(ctype.settings)
				};
				outCustomTypes.push(ctOut);
				return outCustomTypes;
			},[]);

			var tempOutObj = {formSets:outFormSets,customTypes:outCustomTypes};
			var outStr = JSON.stringify(tempOutObj);
	}
	else
	{
		var outStr = JSON.stringify(outFormSets);
	}

	return outStr;
},
clearAll:function()
{
     ijfUtils.clearExt();

    jQuery('#ijfHead').html('');
    jQuery('#ijfContent').html('');
    jQuery('#ijfFoot').html('');
    jQuery('#ijfHead').removeAttr("style");
    jQuery('#ijfContent').removeAttr("style");
    jQuery('#ijfFoot').removeAttr("style")
    jQuery('#ijfOuterContainer').removeAttr("style")

},
getFileInputName:function(inInput,inLableKey)
{
	var retStr = "";
	var fls = inInput.files;
	if(inInput.files.length==1)
	{
		retStr = fls[0].name;
		document.getElementById(inLableKey).title = "";
		return retStr;
	}
	retStr =fls[0].name;
	for(var i=1;i<fls.length;i++)
	{
		retStr+=", " + fls[i].name;
	};
	document.getElementById(inLableKey).title = retStr;
	return fls.length + " files selected";
},
setElementWithStyleString:function(inDomId,inStyleString)
{
	try
	{
		var hStyle = ijfUtils.cssToJson(inStyleString);
		var ocs = document.getElementById(inDomId);
		if(ocs) ijfUtils.applyStyle(ocs,hStyle);
	}
	catch(e)
	{
		ijfUtils.footLog("Error in style setting " + inStyleString);
	}

},

renderHeader:function(inContainerId, thisForm,item)
{

    var headerLeft = ijfUtils.replaceKeyValues(thisForm.settings["headerLeft"],item);
    var headerCenter = ijfUtils.replaceKeyValues(thisForm.settings["headerCenter"],item);
    var headerRight = ijfUtils.replaceKeyValues(thisForm.settings["headerRight"],item);

    ijfUtils.setHead("<div style='display: table;width:100%'><div style='display:table-cell;width:17%'>" + headerLeft + "</div>" +
        "<div style='text-align:center;display:table-cell;width:66%'>"  + headerCenter + "</div>" +
        "<div style='text-align:right;display:table-cell;width:17%'>" + headerRight + "</div></div>");

    //ijfUtils.setHead("<table  role='presentation' width='100%' borders=0><tr><td width='33%' align='left'>" + headerLeft + "</td>" +
    //    "<td  width='33%' align ='center'>"  + headerCenter + "</td>" +
    //    "<td  width='33%' align='right'>" + headerRight + "</td></tr></table>");
},

setHead:function(inMsg)
{

    jQuery('#ijfHead').html(inMsg);

},

setHeadStyle:function(inStyle)
{

    jQuery('#ijfHead').css(JSON.parse("{" + inStyle + "}"));

},

setFoot:function(inMsg)
{

    jQuery('#ijfFoot').html(inMsg);

},

setContent:function(cId,x,y,colSpans,cellsOnly,rowSpans)
{
		var rows = x/1+1;
		var cols = y/1+1;

		//trying with cell spacing at 0
		var cHtml = "<table  role='presentation' id='"+cId+"_ijfContentTableId' cellspacing=0 cellpadding=3>";


		var cellStyle = 'ijf-cell';
		var cellContent = '';
		if(cellsOnly) cellStyle = 'ijfAdmin-cell';
		var runningRowSpans = [];

		for (var i = 1; i<rows;i++)
		{
			cHtml += "<tr>";
			for (var j=1; j<cols; j++)
			{
				cellContent = '';
				if(cellsOnly) cellContent = "<span onclick=ijf.admin.onLayoutHover(this)>"+i+","+j+"</span>";


				//are you attempting to write a cell that should be missing due to rowspan?
				if(runningRowSpans.hasOwnProperty(j))
				{
					var testToSpan = runningRowSpans[j];
					if(testToSpan>0)
					{
						runningRowSpans[j] = testToSpan-1;
						continue;
					}
				}

				var rspanString = "";
				if(rowSpans.hasOwnProperty(i+"_"+j))
				{
					rspanString = "rowspan='"+rowSpans[i+"_"+j]+"'";
					//j is the column that is spanned over rows...
					runningRowSpans[j] = rowSpans[i+"_"+j]/1-1;
					//need to look at colspans, if this cell has a colspan, add runningRowSpans to it's child columns
					if(colSpans.hasOwnProperty(i+"_"+j))
					{
					  var cSpan = colSpans[i+"_"+j]/1;
					  for(var c=j+1;c<(j+cSpan);c++) runningRowSpans[c] = rowSpans[i+"_"+j]/1-1;
					}
				}

				if(colSpans.hasOwnProperty(i+"_"+j))
				{
					var cSpan = colSpans[i+"_"+j];
					cHtml += "<td  valign='top' " + rspanString + " colspan='" + cSpan + "' id='td_"+cId+"_"+i+"_"+j+"'><div class='"+cellStyle+"' id='"+cId+"_"+i+"_"+j+"'>"+cellContent+"</div></td>";
					j=j+(cSpan/1)-1;
				}
				else
				{
					cHtml += "<td " + rspanString + " valign='top' id='td_"+cId+"_"+i+"_"+j+"'><div  class='"+cellStyle+"' id='"+cId+"_"+i+"_"+j+"'>"+cellContent+"</div></td>";
				}
			}
			cHtml += "</tr>";
		}
		cHtml += "</table>";
		var fContent = document.getElementById(cId);
		fContent.innerHTML=cHtml;
},

modalDialog:function(inTitle,inMessage,inFunction)
{

	var tm = Ext.Msg.show({
	    title: inTitle,
	    message: inMessage,
	    buttons: Ext.Msg.OKCANCEL,
	    icon: Ext.Msg.QUESTION,
	    fn: function(btn) {
	        if (btn === 'ok') {
	            inFunction();
			}
	    }
    });

    tm.setY(window.pageYOffset+300);

},
modalDialogPrompt:function(inTitle,inMessage,inDefault, inFunction)
{
	         var localValue = inDefault;
			 var rWin = new Ext.Window({
					title: inTitle,
					width: 600,
					height: 200,
					closable: true,
					scrollable: true,
					items:[
						{
							xtype: 'panel',
							layout: 'fit',
							margin: '10 0 0 10',
							html: inMessage
						}
						,
						{
							xtype: 'textfield',
							labelAlign: 'left',
							labelWidth: 120,
							style: 'margin:0 0 0 10',
							width: 500,
							value: inDefault,
							listeners: {
								change: function(f, n, o){
									localValue=n;
								}}
				          }
					],
					buttons:[
						{
							text:'OK',
							handler: function(){
								if(!localValue)
								{
									ijfUtils.modalDialogMessage("Info","You must provide a value");
									return;
								}

								rWin.close();
								inFunction(localValue);
							}},
						{
							text:'Cancel',
							handler: function(){
								rWin.close();
							}}
					],
					modal: true
				});
		rWin.show();
		rWin.setY(window.pageYOffset+300);
},
modalMessage:function(inTitle,inMessage)
{

			 var rWin = new Ext.Window({
					title: inTitle,
					width: 800,
					height: 500,
					closable: true,
					scrollable: true,
					items:[
					{
						xtype: 'panel',
						layout: 'fit',
						margin: '10 0 0 10',
						html: inMessage
					}
					],
					buttons:[
						{
							text:'Close',
							handler: function(){
								rWin.close();
							}}
					],
					modal: true
				});
		rWin.show();
		rWin.setY(window.pageYOffset+300);

},

modalDialogMessage:function(inTitle,inMessage)
{

    var tm = Ext.Msg.alert(inTitle,inMessage);
     tm.setY(window.pageYOffset+300);
},


modalDialogMessageWithFunction:function(inTitle,inMessage,inFunction)
{

    var dMes = "<div id='dialog1inner' style=\"word-wrap: break-word; padding:5px; 5px, 5px, 5px; border:solid lightblue 0px;\">"+inMessage+"</div>";
    dwinval=false;
    dWin = new Ext.Window({
        layout: 'fit',
        title: inTitle,
        width: 300,
        height: 200,
        closable: false,
        items: {
            html: dMes,
            xtype: "panel"},
        buttons:[{
            text:'OK',
            handler: function(){
                // alert('ok')

                dWin.close();
                inFunction();
            }}
        ],
        modal: true
    });
    dWin.show();
     dWin.setY(window.pageYOffset+300);

},

showProgress:function()
{

	Ext.getBody().mask("Loading...");

},

hideProgress:function(focusTop)
{
	Ext.getBody().unmask();

},

loadConfig:function(onSuccess, onError)
{
    jQuery.ajax(g_root + '/plugins/servlet/iforms?ijfAction=getConfig', {
        success: onSucess,
        error: onError
    });
},

replaceWordChars:function(text) {

    var s = text;
    // smart single quotes and apostrophe
    s = s.replace(/[\u2018\u2019\u201A]/g, "\'");
    // smart double quotes
    s = s.replace(/[\u201C\u201D\u201E]/g, "\"");
    // ellipsis
    s = s.replace(/\u2026/g, "...");
    // dashes
    s = s.replace(/[\u2013\u2014]/g, "-");
    // circumflex
    s = s.replace(/\u02C6/g, "^");
    // open angle bracket
    s = s.replace(/\u2039/g, "<");
    // close angle bracket
    s = s.replace(/\u203A/g, ">");
    // spaces
    s = s.replace(/[\u02DC\u00A0]/g, " ");

    //worry on amp when combined with chars
    //if(s.match(/\S\&\s|\S\&\S|\s\&\S/)) s=s.replace("&", " & ");
    //s = s.replace("&","&amp;");

    s = s.replace(/&/g,"&amp;");
    s = s.replace(/</g,"&lt;");
    s = s.replace(/>/g,"&gt;");
    //s = s.replace(/"/g,"&quot;");
    //s = s.replace(/'/g,"&apos;");

    //sledge hammer
    s = unescape(encodeURIComponent(s));

    //special coding to inject OO coding back in
    //s=s.replace(/>/g,"!\\GT").replace(/</g,"!\\LT");
    //s-s.replace(/!\\LT/g,"<").replace(/!\\GT/g,">");
    //s=s.replace(/>/g,"!{GT}").replace(/</g,"!{LT}");
    s=s.replace(/!{LT}/g,"<").replace(/!{GT}/g,">");
    return s;
},

	resetTimeout:function()
	{
		if(sessionTimeout) clearTimeout(sessionTimeout);
		//setting to 30 minutes idle time.  30 * 60sec * 1000 = 1,800,000
		sessionTimeout = setTimeout(handleTimeout, 1800000);
	},

	handleTimeout:function()
	{
		modalDialogMessage("Warning","Your session has been idle for a long time.  Please refresh the browser prior to attempting any form saves.");
	},

	setItemListWorkflowName:function(inItemId, inWfName)
	{

		for(var i in itemList)
		{
			if (itemList.hasOwnProperty(i))
			{
				if(itemList[i][0]==inItemId)
					itemList[i][2]=inWfName;
			}
		}
	},

	getFirstItemByName:function(inName)
	{

		for(var i in itemList)
		{
			if (itemList.hasOwnProperty(i))
			{
				if(itemList[i][1]==inName) return items[itemList[i][0]];
			}
		}
		return null;
	},

	deleteItemListValue:function(inKey)
	{
		delete items[inKey];
		itemList = [];
		for(var i in items)
		{
			if (items.hasOwnProperty(i))
			{
				var thisItem = items[i];
				itemList.push([thisItem.id,thisItem.name,thisItem.stage]);
			}
		}
	},


	setCacheValue:function(inKey, inValue)
	{
		ijfUtils.footLog("Calling set cache for " + inKey);
		$.ajax({
			async: false,
			type: 'POST',
			url: g_root + '/setCacheValue',
			data: {
				inKey: inKey,
				inValue: inValue
			},
			timeout: 60000,
			success: function(data) {
				//jQuery('#main').html(jQuery(data).find('#main *'));
				return data;
			},
			error: function() {
				ijfUtils.footLog("Failed cache data set!");
				return null;
			}
		});
	},

	getNextSequence:function(inName, inBase)
	{
		ijfUtils.footLog("Calling get seq for " + inName);
		var retval= "seq failed";
		$.ajax({
			async: false,
			type: 'GET',
			url: g_root + '/getNextSequence?exerciseId='+g_exerciseId+ '&name=' + inName + '&base=' +inBase,
			timeout: 60000,
			success: function(data) {
				retval=data.value
			},
			error: function() {
				ijfUtils.footLog("Failed cache data get!");

			}
		});
		return retval;
	},

	getCacheValue:function(inKey)
	{
		ijfUtils.footLog("Calling get cache for " + inKey);
		$.ajax({
			async: false,
			type: 'GET',
			url: g_root + '/setCacheValue?inKey='+inKey,
			timeout: 60000,
			success: function(data) {
				//jQuery('#main').html(jQuery(data).find('#main *'));
				return data;

			},
			error: function() {
				ijfUtils.footLog("Failed cache data get!");
				return null;
			}
		});
	},


	cleanId:function(inId)
	{
		var outId = inId.replace(/ /g,"_");
		 outId = outId.replace(/,/g,"_");
		 outId = outId.replace(/\?/g,"_");
		 outId = outId.replace(/\./g,"_");
		 outId = outId.replace(/\:/g,"_");
		 outId = outId.replace(/\//g,"_");
		return outId;
	},
	sanitize2:function(inText)
	{
		if(inText)
		{
			var outText = inText.replace(/<[s,S][c,C][r,R][i,I][p,P][t,T].*<\/[s,S][c,C][r,R][i,I][p,P][t,T]>/g,"");
			return outText;
		}
		return inText;
	},
	sanitize:function(html) {
		var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
		var tagOrComment = new RegExp(
			'<(?:'
			// Comment body.
			+ '!--(?:(?:-*[^->])*--+|-?)'
			// Special "raw text" elements whose content should be elided.
			+ '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
			+ '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
			// Regular name
			+ '|/?[a-z]'
			+ tagBody
			+ ')>',
			'gi');
	  var oldHtml;
	  do {
	    oldHtml = html;
	    html = html.replace(tagOrComment, '');
	  } while (html !== oldHtml);
	  //html = html.replace(/script/gi, '');
	  //html = html.replace(/style/gi, '');
	  return html.replace(/</g, '&lt;');
    },
	clearExt:function()
	{
		//var mcm = new Ext.ComponentManager();
		//var comps = Ext.ComponentManager.getAll();
		if(ijf.main.controlSet)
		{
			for(var c in ijf.main.controlSet)
			{
				//special handling for htmleditor, must clear all these manually FIRST
			   if(ijf.main.controlSet[c].hasOwnProperty('control'))
			   {
				   if(ijf.main.controlSet[c].field)
				   {

					   if(ijf.main.controlSet[c].field.controlType == "htmleditor")
					   {
							ijf.main.controlSet[c].control.removeAll(true);
							//console.log("Removed " + c);
					        delete ijf.main.controlSet[c];
				       }
				   }
			   }
			}

			for(var c in ijf.main.controlSet)
			{
			   if(ijf.main.controlSet.hasOwnProperty(c))
			   {
				   /*
				   if(ijf.main.controlSet[c].hasOwnProperty('control'))
				   {
					   if(ijf.main.controlSet[c].control)
					   {
						   try
						   {
							   ijf.main.controlSet[c].control.removeAll(true);
						   }
						   catch(e){
							   ijfUtils.footLog("Failed clear on " + c + " message=" + e.message);
						   }
					   }
				   }
				   */
				   if (ijf.main.controlSet[c].control) {
						 Ext.destroy(ijf.main.controlSet[c].control);
				   }
			   }
			}
		}
		ijf.main.controlSet = new Array();
	},

	IsNumeric:function(_in) {
		if (parseFloat(_in) === Number(_in) && Number(_in) !== NaN)
			return true;
		return false;
	},
    setColWidth:function(inCol,inIndex,inColWidths,inDefault)
    {
			if(inColWidths[inIndex])
			{
				var tW = inColWidths[inIndex];
				//if numeric, set width, if %, remove % and set flex
				if(isNaN(tW)) inCol.flex=tW.replace("%","")/1;
				else inCol.width=tW/1;
			}
			else
			{
				if(isNaN(inDefault))
				{
					try
					{
						inCol.flex=inDefault.replace("%","")/1;
					}
					catch(e)
					{
						inCol.flex=15;
					}
				}
				else
					inCol.width=inDefault/1;
			}
	},
    setColWidthForItemList:function(inCol)
    {
			if(isNaN(inCol.width))
			{
				try
				{
					inCol.flex=inCol.width.replace("%","")/1;
					inCol.width=null;
				}
				catch(e)
				{
					ijfUtils.footLog("Invalid column width: " + inCol.width);

				}
			}
	},
	getComboList:function(inList, inComboRef, inKeys)
	{

		if(inKeys.length==0)
		{
			//this is the level we want to get, return all the elements...
			//if last level is array....
			if(Array.isArray(inComboRef))
			{
				for(var cItem in inComboRef)
				{
					//({'item':sVal,'value':sVal});
					if(inComboRef.hasOwnProperty(cItem)) inList.push({'item':inComboRef[cItem],'value':inComboRef[cItem]});
				}
			}
			else
			{
				//not array, get elements keys
				for(var cItem in inComboRef)
				{
					if(inComboRef.hasOwnProperty(cItem)) inList.push({'item':cItem,'value':cItem});
				}
			}
		}
		else
		{
			//not last level, get first level of inKeys, find and recurse
			var key = inKeys.pop();
			//not array, get elements keys
			for(var cItem in inComboRef)
			{
				if(inComboRef.hasOwnProperty(cItem))
				{
					if(cItem==key)
					{
						getComboList(inList, inComboRef[cItem],inKeys);
						break;
					}
				}
			}
		}
	},

	getEvent:function(inField)
	{
		var ocf = function(){return true};
		var l_Event = "";
		try
		{
			l_Event = inField.event.trim();

			if(l_Event!="")
			{


				var ocf = function(f,n,o)
				{
					try
					{
						//var anonFunct = evxxxal("(function(){ " + l_Event + "})");
						//var outVal = anonFunct();
						ijfUtils.footLog("Executing field event: " + l_Event);
						var outVal = ijf.snippets[l_Event](f,n,o);
						return outVal;
					}
					catch(e)
					{
						ijfUtils.footLog("field event failed: " + e.message);
					}
				};
			}
			return ocf;

		}
		catch(e)
		{
			ocf = function(){return true};
			ijfUtils.footLog("error setting up event " + e.message);
			return ocf;
		}
	},


	renderIfShowField:function(inData, inField)
	{
		if(!inField.renderIf) return false;
		var hideField = false;
		var l_renderIf = "";
		try
		{
			l_renderIf = inField.renderIf.trim();
			if((l_renderIf!="") && (l_renderIf!=null))
			{
				var outVal = ijf.snippets[l_renderIf](inData, inField);
				if(outVal==false) hideField = true;
			}
			return hideField;
		}
		catch(e){
			ijfUtils.footLog("Error in renderIf: " + e.message);
			return true;
		}

	},

	onLoadHandler:function(inFun)
	{

		var valid = true;
		var l_br = "";
		try
		{
			l_br = inFun;
			if((l_br!="") && (l_br!=null))
			{
				var bFunc = l_br;
				var bVars = null;
				if(l_br.indexOf("(")>-1)
				{
					var bSplit = l_br.split("(");
					bFunc = bSplit[0];
					var bVar = bSplit[1].replace(")","");
					bVars = bVar.split(",");
				}

				var outVal = ijf.snippets[bFunc](bVars);

				if(outVal==false) valid = false;
			}
			return valid;
		}
		catch(e){
			ijfUtils.footLog("Error in form on load event: " + e.message);
			return false;
		}
	},

	businessRuleValidate:function(inBr)
	{
		var valid = true;
		var l_br = "";
		try
		{
			l_br = inBr.rule;
			if((l_br!="") && (l_br!=null))
			{
				var bFunc = l_br;
				var bVars = null;
				if(l_br.indexOf("(")>-1)
				{
				   var bSplit = l_br.split("(");
				   bFunc = bSplit[0];
				   var bVar = bSplit[1].replace(")","");
				   bVars = bVar.split(",");
				}

				var outVal = window[bFunc](bVars);

				if(outVal==false) valid = false;
			}
			return valid;
		}
		catch(e){
			ijfUtils.footLog("Error in form business rule: " + e.message);
			return false;
		}
	},


	setFieldVisible:function(controlKey,visible)
	{
		var targetControlKey =ijf.main.controlSet[controlKey];
		targetControlKey.control.setVisible(visible);
	},
    getControlByDataSource: function(inDataSource)
    {
		//new logic, inDatasource may be "session + cell"  if field begins witih session....use those params to find your control
		var retCnt = Object.keys(ijf.main.controlSet).reduce(function(inObj,c)
		{
			if(ijf.main.controlSet[c].field.dataSource==inDataSource)
			{
				inObj=ijf.main.controlSet[c];
				return inObj;
			}
			if(typeof inDataSource === 'string')
			{
				if(inDataSource.substring(0,7)=="session")
				{
					var targetCell = inDataSource.replace("session","");
					if(ijf.main.controlSet[c].field.formCell==targetCell)
					{
						inObj=ijf.main.controlSet[c];
						return inObj;
					}
				}
			}
			return inObj;
		},null);
		return retCnt;
	},
    getControlByKey: function(inKey)
    {
		var retCnt = null;
		if(ijf.main.controlSet.hasOwnProperty(inKey)) retCnt = ijf.main.controlSet[inKey];
		return retCnt;
	},
	getField: function(inName)
	   {
		var thisField=null;
		if(ijf.main.controlSet.hasOwnProperty(inName)){
			thisField = ijf.main.controlSet[inName];
		}else{
			thisField = Object.keys(ijf.main.controlSet).reduce(function(inS, s){if(ijf.main.controlSet[s].field.dataSource==inName)inS=ijf.main.controlSet[s]; return inS;},null);
		}
		return thisField;
    },
	getFieldValue:function(controlKey)
	{
		var retVal = null;
		try
		{
			var targetControlKey =ijf.main.controlSet[controlKey];
			retVal = targetControlKey.control.items.items[0].getValue();
		}
		catch(e)
		{
			ijfUtils.footLog("Error getting value from" + controlKey + " " +  e.message);
		}
		return retVal;
	},

	getTableRowCount:function(controlKey)
	{
		var retVal = 0;
		try
		{
			var targetControlKey =ijf.main.controlSet[controlKey];
			var tData =targetControlKey.control.items.items[0].getStore();
			retVal = tData.getCount();

			if(retVal==1)
			{
				//must look at values to ensure they are not all null....
				retVal=0;
				for(var v in tData.data.items[0].data)
				{
					if(tData.data.items[0].data.hasOwnProperty(v))
					{
						if(v=="id") continue;
						if(tData.data.items[0].data[v])
						{
							retVal=1;
							break;
						}
					}
				}
			}

		}
		catch(e)
		{
			ijfUtils.footLog("Error getting row count from" + controlKey + " " +  e.message);
		}
		return retVal;
	},


	getNameValueFromStyleString:function(inString,inKey)
	{
		var retStr="";
		var innerArray=[];
		var outerArray=[];
		var i;
		var j;
		try
		{
			outerArray = inString.split(";");
			for(i=0;i<outerArray.length;i++)
			{
				innerArray=outerArray[i].split(":");
				if(innerArray[0].trim()==inKey) return innerArray[1].trim();
			}
		}
		catch(e)
		{
			return "";
		}
		return retStr;
	},


	switchParamsFromObject:function(inText,inObj)
	{
		var retText = inText;
		if((!retText)||(retText=="")) return "";

		var retText = inText;
		var pat = "\#\{obj:.*?\}";
		var rgx = new RegExp(pat);
		var m = rgx.exec(inText)
		if(m==null)
		{
			return retText;
		}
		else
		{
			var keyVal = m[0].replace("#{obj:","");
			keyVal = keyVal.replace("}","");
			retText = inText.replace(m[0],inObj[keyVal]);
			retText = switchParamsFromObject(retText,inObj);
		}
		return retText;
	},

	replaceKeyValues:function(inText, item, noSanitize)
	{
		var retText = inText;
		if(!inText)  return inText;

		retText=retText.replace("#{user}",ijf.main.currentUser.displayName);
		retText=retText.replace("#{useremail}",ijf.main.currentUser.email);
		retText=retText.replace("#{userid}",ijf.main.currentUser.id);
        retText=retText.replace("#{datetime}",moment().format('LL'));

	    retText = this.switchSessionAtts(retText,item,noSanitize);
	    retText = this.switchSnippetAtts(retText,item,noSanitize);

		if(!item) return retText;

		if((!retText)||(retText=="") || (!item)) return "";

		if(!item.key) return retText;

		if(item.fields) if(item.fields.parent) retText = retText.replace(/\#\{parent.key\}/g,item.fields.parent.key);

		retText = retText.replace(/\#\{key\}/g,item.key);
		retText = retText.replace(/\#\{summary\}/g,item.fields.summary);
		retText = retText.replace(/\#\{status\}/g,item.fields.status.name);

	    retText = this.switchAtts(retText,item,noSanitize);
		return retText;
	},
	switchSessionAtts:function(inText,item,noSanitize)
	{
		var retText = inText;
		var pat = "\#\{session:.*?\}";
		var rgx = new RegExp(pat);
		var m = rgx.exec(inText);

		if(m==null)
		{
			return retText;
		}
		else
		{
			var keyVal = m[0].replace("#{session:","");
			keyVal = keyVal.replace("}","");

			if(ijf.session.hasOwnProperty(keyVal))
			{
				retText = inText.replace(m[0],ijf.session[keyVal]);
			}
			else
			{
				//retText = inText.replace(m[0], " ("+keyVal+" not found) ");
				ijfUtils.footLog(keyVal + " session val not found");
				retText = inText.replace(m[0], "");
			}
			retText = this.switchSessionAtts(retText,item,noSanitize);
		}
		return retText;
	},
	switchSnippetAtts:function(inText,item,noSanitize)
	{
		var retText = inText;
		var pat = "\#\{snippet:.*?\}";
		var rgx = new RegExp(pat);
		var m = rgx.exec(inText);

		if(m==null)
		{
			return retText;
		}
		else
		{
			var keyVal = m[0].replace("#{snippet:","");
			keyVal = keyVal.replace("}","");

			if(ijf.snippets.hasOwnProperty(keyVal))
			{
				try
				{
				  var tVal = ijf.snippets[keyVal]();
				  retText = inText.replace(m[0],tVal);
				}
				catch(e)
				{
					retText = inText.replace(m[0],"Error with key value snippet " + keyVal);
				}
			}
			else
			{
				//retText = inText.replace(m[0], " ("+keyVal+" not found) ");
				ijfUtils.footLog(keyVal + " snippet val not found");
				retText = inText.replace(m[0], "");
			}
			retText = this.switchSnippetAtts(retText,item,noSanitize);
		}
		return retText;
	},
	switchAtts:function(inText,item,noSanitize)
	{
		var retText = inText;
		var pat = "\#\{.*?\}";
		var rgx = new RegExp(pat);
		var m = rgx.exec(inText);

		if(m==null)
		{
			return retText;
		}
		else
		{
			var keyVal = m[0].replace("#{","");
			keyVal = keyVal.replace("}","");

			var repVal = "";
			if(ijf.jiraFieldsKeyed.hasOwnProperty(keyVal))
			{
				var jField = item.fields[ijf.jiraFieldsKeyed[keyVal].id];
				if(jField)
				{
					repVal = this.handleJiraFieldType(ijf.jiraFieldsKeyed[keyVal],jField,true,noSanitize);
				}
			}
			if(repVal)
			{
				retText = inText.replace(m[0],repVal);
			}
			else
			{
				//retText = inText.replace(m[0], " ("+keyVal+" not found) ");
				ijfUtils.footLog(keyVal + " not found");
				retText = inText.replace(m[0], "");
			}
			retText = this.switchAtts(retText,item,noSanitize);
		}
		return retText;
	},
	switchAttsGeneric:function(inText,inData)
		{
			if(!inData) return inText;
			var retText = inText;
			var pat = "\#\{.*?\}";
			var rgx = new RegExp(pat);
			var m = rgx.exec(inText);

			if(m==null)
			{
				return retText;
			}
			else
			{
				var keyVal = m[0].replace("#{","");
				keyVal = keyVal.replace("}","");

				var repVal = "";
				if(inData.hasOwnProperty(keyVal))
				{
					var jField = inData[keyVal];
					retText = inText.replace(m[0],jField);
				}
				else
				{
					//retText = inText.replace(m[0], " ("+keyVal+" not found) ");
					ijfUtils.footLog(keyVal + " not found");
					retText = inText.replace(m[0], "");
				}
				retText = this.switchAttsGeneric(retText,inData);
			}
			return retText;
	},
    getJiraFieldValue:function(inName, inIssue, forDisplay, noSanitize)
    {
		if(!inIssue.fields) return null;
		if(ijf.jiraFieldsKeyed.hasOwnProperty(inName))
		{
			var f = ijf.jiraFieldsKeyed[inName];
			var issF = inIssue.fields[f.id];
			if(!issF) return;
			return this.handleJiraFieldType(f, issF, forDisplay, noSanitize)
		}
		return null;
	},
	handleJiraFieldType:function(inType, inField, forDisplay,noSanitize)
	{
		if(inField == null) return null;

		switch(inType.schema.type)
		{
			case "number":
			    return inField;
			    break;
			case "parent":
				if(forDisplay) inField.key;
				return inField;
			    break;
			case "string":
			    if(noSanitize)
			    {
					return inField;
				}
				else
				{
					return ijfUtils.sanitize(inField);
				}
				break;
			case "issuetype":
				return inField.name;
				break;
			case "user":
				//ijfUtils.footLog("User Field: " + JSON.stringify(inField));
				if(forDisplay) if(inField) return inField.displayName;
				return inField.key;//inField.name;
				break;
			case "group":
				return inField.name;
				break;
			case "datetime":
			     if(inField) return this.ConvertDb2Date(inField);
 				 return inField;
				break;
			case "date":
			     if(inField) return this.ConvertDb2Date(inField);
 				 return inField;
				break;
		    case "array":
		        if(forDisplay)
		        {
					if(inField.worklogs) return inField.worklogs.length;

					return inField.reduce(function(inStr,e)
					{

						if(e.value)
						{
							inStr+= e.value + " ";
						}
						else if(e.name)
						{
							inStr+= e.name + " ";
						}
						else if(e.filename)
						{
							inStr+= e.filename + " ";
						}
						else
						{
							inStr+= JSON.stringify(e) + " ";
						}

						return inStr;
					},"");
				}
				if(inField.worklogs) return inField.worklogs;
			    return inField;
				break;
			case "securitylevel":
			case "priority":
			case "status":
				 if(forDisplay) return inField.name;
			     if(inField) return inField.id;
 				 return inField;
				break;
			case "option":
				 if(forDisplay) return inField.value;
			     if(inField) return inField.id;
 				 return inField;
				break;
			case "comments-page":
			    return "";
			    break;
			case "project":
			    if(forDisplay) return inField.name;
			    if(inField) return inField.key;
			default:
				return "unknown type";
		}
	},
    translateJiraFieldsToIds:function(inCsv)
    {
		var fields = inCsv.split(",");
		var raVal = [];
		fields.forEach(function(f){
			var tf = f.trim();
			if(ijf.jiraFieldsKeyed.hasOwnProperty(tf))
			{
				raVal.push(ijf.jiraFieldsKeyed[tf].id);
			}
			else
			{
				raVal.push(tf);
			}
		});
		return raVal.join(",");
	},
    translateJiraFieldsToObjs:function(inCsv)
    {
		var fields = inCsv.split(",");
		var raVal = [];
		fields.forEach(function(f){
			var tf = f.trim();
			if(ijf.jiraFieldsKeyed.hasOwnProperty(tf))
			{
				raVal.push({"id":ijf.jiraFieldsKeyed[tf].id,"name":f});
			}
			else
			{
				raVal.push({"id":f,"name":f});
			}
		});
		return raVal;
	},
    getJiraFieldById:function(inId)
    {
		var retVal ={};
		//ijf.jiraFields.forEach(function(f){if(f.id==inId)retVal=f});
		for(var i=0;i<ijf.jiraFields.length;i++){
			//console.log(ijf.jiraFields[i].id);
			if(ijf.jiraFields[i].id==inId)
			{
				retVal=ijf.jiraFields[i];
				break;
			}
		}
		return retVal;
	},

	formatDateMDY:function(value)
	{
		return value ? value.dateFormat('m/d/y') : '';
	},



	dateFormatAMPM:function() {
		var date = new Date();
		var currDate = date.getDate();
		var hours = date.getHours();
		var dayName = getDayName(date.getDay());
		var minutes = date.getMinutes();
		var monthName = getMonthName(date.getMonth());
		var year = date.getFullYear();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = dayName + ' ' + monthName + ' ' + currDate + ' ' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
		return strTime;
	},


	getMonthName:function(month) {
		var ar = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
		return ar[month];
	},


	getDayName:function(day) {
		var ar1 = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
		return ar1[day];
	},


	ConvertLongDateToShort:function(inDateStr)
	{
		var d = null;
		var retVal = "";
		try
		{
			var tics = Date.parse(inDateStr);
			if (isNaN(tics))
			{
				d = null;
			}
			else
			{
				d = new Date(tics);
			}
			retVal = ((d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear());
		}
		catch(e)
		{}
		return retVal;
	},


	ConvertDb2Date:function(inDateStr)
	{

		var rgx = new RegExp("2[0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]");
		if (rgx.exec(inDateStr)) {
			var newStr = inDateStr.substr(5,2) + "/" + inDateStr.substr(8,2) + "/" +inDateStr.substr(0,4);
			return newStr;
		}
		return inDateStr;
	},


	ConvertShort2Db2Date:function(inDateStr)
	{

		if((inDateStr!=null) && (inDateStr.length==10))
		{
			var rgx = new RegExp("[0-1][0-9]/[0-3][0-9]/2[0-9][0-9][0-9]");
			if (rgx.exec(inDateStr)) {
				var newStr =inDateStr.substr(6,4) + "-" + inDateStr.substr(0,2) + "-" +  inDateStr.substr(3,2);
				return newStr;
			}
		}
		return inDateStr;
	},


	tagBody:'(?:[^"\'>]|"[^"]*"|\'[^\']*\')*',


	tagOrComment: new RegExp(
		'<(?:'
			// Comment body.
			+ '!--(?:(?:-*[^->])*--+|-?)'
			// Special "raw text" elements whose content should be elided.
			+ '|script\\b' + this.tagBody + '>[\\s\\S]*?</script\\s*'
			+ '|style\\b' + this.tagBody + '>[\\s\\S]*?</style\\s*'
			// Regular name
			+ '|/?[a-z]'
			+ this.tagBody
			+ ')>',
		'gi'),

CSVtoArray:function (strData, strDelimiter ){

        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );
        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );
            }
            var strMatchedValue;
            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        // Return the parsed data.
        return( arrData );
},
	xmlDecode:function(inData)
	{
		if(inData==null) return "";

		var lData = inData;

		lData = lData.replace(/\&\#9;/g,"\t");
		lData = lData.replace(/\&\#10;/g,"\n");

		lData = lData.replace(/\&\#32;/g," ");
		lData = lData.replace(/\&\#33;/g,"!");
		lData = lData.replace(/\&\#34;/g,"\"");
		lData = lData.replace(/\&\#35;/g,"#");
		lData = lData.replace(/\&\#36;/g,"$");
		lData = lData.replace(/\&\#37;/g,"%");
		lData = lData.replace(/\&\#38;/g,"&");
		lData = lData.replace(/\&\#39;/g,"'");
		lData = lData.replace(/\&\#40;/g,"(");
		lData = lData.replace(/\&\#41;/g,")");
		lData = lData.replace(/\&\#42;/g,"*");
		lData = lData.replace(/\&\#43;/g,"+");
		lData = lData.replace(/\&\#44;/g,",");
		lData = lData.replace(/\&\#45;/g,"-");
		lData = lData.replace(/\&\#46;/g,".");
		lData = lData.replace(/\&\#47;/g,"/");
		lData = lData.replace(/\&\#48;/g,"0");
		lData = lData.replace(/\&\#49;/g,"1");
		lData = lData.replace(/\&\#50;/g,"2");
		lData = lData.replace(/\&\#51;/g,"3");
		lData = lData.replace(/\&\#52;/g,"4");
		lData = lData.replace(/\&\#53;/g,"5");
		lData = lData.replace(/\&\#54;/g,"6");
		lData = lData.replace(/\&\#55;/g,"7");
		lData = lData.replace(/\&\#56;/g,"8");
		lData = lData.replace(/\&\#57;/g,"9");
		lData = lData.replace(/\&\#58;/g,":");
		lData = lData.replace(/\&\#59;/g,";");
		lData = lData.replace(/\&\#60;/g,"<");
		lData = lData.replace(/\&\#61;/g,"=");
		lData = lData.replace(/\&\#62;/g,">");
		lData = lData.replace(/\&\#63;/g,"?");
		lData = lData.replace(/\&\#64;/g,"@");
		lData = lData.replace(/\&\#65;/g,"A");
		lData = lData.replace(/\&\#66;/g,"B");
		lData = lData.replace(/\&\#67;/g,"C");
		lData = lData.replace(/\&\#68;/g,"D");
		lData = lData.replace(/\&\#69;/g,"E");
		lData = lData.replace(/\&\#70;/g,"F");
		lData = lData.replace(/\&\#71;/g,"G");
		lData = lData.replace(/\&\#72;/g,"H");
		lData = lData.replace(/\&\#73;/g,"I");
		lData = lData.replace(/\&\#74;/g,"J");
		lData = lData.replace(/\&\#75;/g,"K");
		lData = lData.replace(/\&\#76;/g,"L");
		lData = lData.replace(/\&\#77;/g,"M");
		lData = lData.replace(/\&\#78;/g,"N");
		lData = lData.replace(/\&\#79;/g,"O");
		lData = lData.replace(/\&\#80;/g,"P");
		lData = lData.replace(/\&\#81;/g,"Q");
		lData = lData.replace(/\&\#82;/g,"R");
		lData = lData.replace(/\&\#83;/g,"S");
		lData = lData.replace(/\&\#84;/g,"T");
		lData = lData.replace(/\&\#85;/g,"U");
		lData = lData.replace(/\&\#86;/g,"V");
		lData = lData.replace(/\&\#87;/g,"W");
		lData = lData.replace(/\&\#88;/g,"X");
		lData = lData.replace(/\&\#89;/g,"Y");
		lData = lData.replace(/\&\#90;/g,"Z");
		lData = lData.replace(/\&\#91;/g,"[");
		lData = lData.replace(/\&\#92;/g,"\\");
		lData = lData.replace(/\&\#93;/g,"]");
		lData = lData.replace(/\&\#94;/g,"^");
		lData = lData.replace(/\&\#95;/g,"_");
		lData = lData.replace(/\&\#96;/g,"`");
		lData = lData.replace(/\&\#97;/g,"a");
		lData = lData.replace(/\&\#98;/g,"b");
		lData = lData.replace(/\&\#99;/g,"c");
		lData = lData.replace(/\&\#100;/g,"d");
		lData = lData.replace(/\&\#101;/g,"e");
		lData = lData.replace(/\&\#102;/g,"f");
		lData = lData.replace(/\&\#103;/g,"g");
		lData = lData.replace(/\&\#104;/g,"h");
		lData = lData.replace(/\&\#105;/g,"i");
		lData = lData.replace(/\&\#106;/g,"j");
		lData = lData.replace(/\&\#107;/g,"k");
		lData = lData.replace(/\&\#108;/g,"l");
		lData = lData.replace(/\&\#109;/g,"m");
		lData = lData.replace(/\&\#110;/g,"n");
		lData = lData.replace(/\&\#111;/g,"o");
		lData = lData.replace(/\&\#112;/g,"p");
		lData = lData.replace(/\&\#113;/g,"q");
		lData = lData.replace(/\&\#114;/g,"r");
		lData = lData.replace(/\&\#115;/g,"s");
		lData = lData.replace(/\&\#116;/g,"t");
		lData = lData.replace(/\&\#117;/g,"u");
		lData = lData.replace(/\&\#118;/g,"v");
		lData = lData.replace(/\&\#119;/g,"w");
		lData = lData.replace(/\&\#120;/g,"x");
		lData = lData.replace(/\&\#121;/g,"y");
		lData = lData.replace(/\&\#122;/g,"z");
		lData = lData.replace(/\&\#123;/g,"{");
		lData = lData.replace(/\&\#124;/g,"|");
		lData = lData.replace(/\&\#125;/g,"}");
		lData = lData.replace(/\&\#126;/g,"~");
		lData = lData.replace(/\&\#126;/g,"~");
		lData = lData.replace(/\&\#8211;/g,"~");
		return lData;
	},

	removeTags:function(html) {

		if((html==null)||(html=="")) return html;

		var oldHtml;
		do {
			oldHtml = html;
			html = html.replace(tagOrComment, '');
		} while (html !== oldHtml);
		return html.replace(/</g, '&lt;');
	},

	escapeRegExp:function(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	},

	replaceAll:function(string, find, replace) {
		return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	},
    generateWordFile:function(itemData,thisT,whenDone)
    {

		    if(!thisT.fileDetail)
		    {
				var fileDetailRaw = ijfUtils.jiraApiSync('GET',g_root + '/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId='+thisT.id, null);

				var cleanDoubleDouble = fileDetailRaw.replace(/\"\"/g,"\"");
				cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
				cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");

				var fileType = JSON.parse(cleanDoubleDouble);
				var fileDetail = {};
				//thisT.settings...
				var fileInfoString = "No file loaded yet";
				try
				{
					var fileDetail = JSON.parse(fileType.settings);
					fileInfoString = fileDetail.fileInfoString;
				}
				catch(e)
				{
					ijfUtils.modalDialogMessage("Error","Unable to get parse file from type");
					if(whenDone) whenDone();
					ijfUtils.hideProgress();
					return;
				}
		    }
		    else
		    {
				var fileType = thisT;
				var fileDetail = thisT.fileDetail;
			}
			var decodedFile = ijfUtils.Base64Binary.base64ToArrayBuffer(fileDetail.file);

			//now augment the data with nested data from the default jql query
			if(fileDetail.jql)
			{
				try
				{
					  var jql = fileDetail.jql;
					  var varBindings = jql.split("$").reduce(function(inKeys, p){
						  //must walk forward and end on ", ) or space
						  var i=0;
						  while(i<p.length) {
							  if((p[i]=="\"") || (p[i]==" ") || (p[i]==")") || (p[i]=="'")) break;
							  i++;
						  }
						  var key = p.substring(0,i);
						  inKeys.push(key);
						  return inKeys;
					  },[]);
					  varBindings=varBindings.slice(1);

					  varBindings.forEach(function(b)
					  {
						 var newVal = itemData[b];
						 if(newVal) jql=jql.replace("$"+b,newVal);
					  });
					  var flds = fileDetail.fields;
					  var translateFields = ijfUtils.translateJiraFieldsToIds(flds);

					  var suffix = "";
					  if(flds) suffix = "&fields=" + translateFields;
					   var aUrl = '/rest/api/2/search?jql='+jql + suffix;
					   var rawList = ijfUtils.jiraApiSync('GET',aUrl, null);
					   var newVals=[];
					   rawList.issues.forEach(function(i){
							var itemData={};
							if(i.fields)
							{
								var fieldMap = ijfUtils.translateJiraFieldsToObjs(flds);
								fieldMap.forEach(function(f){
									if(ijf.jiraFieldsKeyed.hasOwnProperty(f.name))
									{
										var v = ijfUtils.handleJiraFieldType(ijf.jiraFieldsKeyed[f.name],i.fields[f.id],true,true);
										itemData["issues." + f.name]=v;
									}
									else
									{
										itemData["issues." + f.id]= i.fields[f.id];
									}
								});
							}
							itemData["issues.key"]=i.key;
							itemData["issues.id"]=i.id;
							itemData["issues.self"]=i.self;
							newVals.push(itemData);
					   });
					   if(fileDetail.snippet)
					   {
						   if(ijf.snippets.hasOwnProperty(fileDetail.snippet)) newVals = ijf.snippets[fileDetail.snippet](newVals);
					   }
					   itemData["issues"] = newVals;
				}
				catch(e)
				{
					//default jql failed to load
					ijfUtils.footLog("Failed to load default JQL for report: " + e.message);
					ijfUtils.hideProgress();
					if(whenDone) whenDone();
					ijfUtils.modalDialogMessage("Error","Failed to load default JQL for report: " + e.message);
					return;
				}
			}
			//Process the file:
			var zip = new JSZip(decodedFile);
			var doc=new Docxtemplater();
			doc.includeTags=false;
			if(fileDetail.debugMode=="true") doc.includeTags=true;
			doc.loadZip(zip);
			doc.setData(itemData);
			doc.render(); //apply them (replace all occurences of {first_name} by Hipp, ...)
			//mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			out=doc.getZip().generate({
				type:"blob",
				mimeType: "application/octet-stream",
			});

		   //name is the name
		   var fParts = fileDetail.fileInfoString.split("\\");
		   if(fParts.length==1)
		   {
			   var fName = fileDetail.fileInfoString;
		   }
		   else
		   {
			   var fName = fParts[fParts.length-1];
		   }
			//var blob = new Blob([decodedFile], {type: "application/octet-stream"});
			saveAs(out,fName);
			if(whenDone) whenDone();
			ijfUtils.hideProgress();
	},

	/*********************
	Data Reference
	**********************/
	getReferenceDataByName:function(refName, keyIndex, asArray, noSort){
		var retRef = [];

		var thisT = {};
		ijf.fw.CustomTypes.forEach(function(t){if(t.name==refName) thisT=t;});

		if(thisT)
		{

			//thisT may or may not have  settings constructed, lazyloading them...
			if(!thisT.settings)
			{
			   var typeIndex = ijf.fw.CustomTypes.indexOf(thisT);

				//load the settings...
               var fullTypeRaw = ijfUtils.jiraApiSync('GET',g_root + '/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId='+thisT.id, null);
			   var cleanDoubleDouble = fullTypeRaw.replace(/\"\"/g,"\"");
			   cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
			   cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");
			   thisT = JSON.parse(cleanDoubleDouble);

			   //update local memory
			   ijf.fw.CustomTypes.splice(typeIndex, 1);
			   ijf.fw.CustomTypes.push(thisT);
			}


			//data may be crlf list, crlf list of tab delimited, JSON
			//try json first...
			try
			{
				retRef = JSON.parse(thisT.settings);
				//try again, if it parses, return it. else
				try
				{
					retRef =JSON.parse(retRef);
				}
				catch(ee)
				{
					retRef = retRef.split("\n");
					//look for CSV....
					if(retRef[0].indexOf("\t")>-1)
					{
						var i = 0;

						var lookup = retRef.map(function(r)
						{
							i=0;
							return r.split("\t").reduce(function(inObj, c){ inObj[i.toString()]=c.trim();i++;return inObj;},{});
						});
						var sFields = [];
						for(var j=0;j<i;j++) sFields.push(j.toString());

						//filter lookup for distinct elements for index
						var uniqueVals = {};
						lookup = lookup.reduce(function(inArr,r)
						{
							//harder...this needs to consider all the parents for uniqueness
							var filterKey=r[keyIndex];
							if(keyIndex>0)
							{
								//this has to go up the tree to get a unique value for this row....
								var curIndex=keyIndex-1;
								while(curIndex > -1) filterKey=r[curIndex--] + filterKey;
							}
							if(!uniqueVals.hasOwnProperty(filterKey))
							{
								uniqueVals[filterKey]=true;
								inArr.push(r);
							}
							return inArr;
						},[]);

						if(asArray)
						{
							retRef=lookup;
						}
						else
						{
							retRef = Ext.create('Ext.data.Store', {
							  fields: sFields,
							  data: lookup
							});
							//sort by the keyIndex
							if(!noSort) retRef.sort(keyIndex);
						}
					}
					else if(retRef[0].indexOf(",")>-1)
					{
						var i = 0;
						var lookup = retRef.map(function(r)
						{
							i=0;
							return r.split(",").reduce(function(inObj, c){ inObj[i.toString()]=c.trim();i++;return inObj;},{});
						});
						var sFields = [];
						for(var j=0;j<i;j++) sFields.push(j.toString());

						//filter lookup for distinct elements for index
						var uniqueVals = {};
						lookup = lookup.filter(function(r){if(uniqueVals.hasOwnProperty(r[keyIndex])) return false; uniqueVals[r[keyIndex]]=true; return true;});

						if(asArray)
						{
							retRef=lookup;
						}
						else
						{
							retRef = Ext.create('Ext.data.Store', {
							  fields: sFields,
							  data: lookup
							});
							//sort by the keyIndex
							if(!noSort) retRef.sort(keyIndex);
						}

					}
					else{
						var lookup = retRef.map(function(r)
						{
							return {"0":r};
						});
						if(asArray)
						{
							retRef=lookup;
						}
						else
						{
							retRef = Ext.create('Ext.data.Store', {
							  fields: ["0"],
							  data: lookup
							});
							//sort by the keyIndex
							if(!noSort) retRef.sort("0");
					    }
					};
				}
			}
			catch(e)
			{
				//not json split as \n, then \t
				retRef = thisT.settings.split("\n");
			}
		}
		return retRef;
	},
	getReferenceDataRaw:function(refName){
		var retRef = [];

		var thisT = {};
		ijf.fw.CustomTypes.forEach(function(t){if(t.name==refName) thisT=t;});

		if(thisT)
		{


			//thisT may or may not have  settings constructed, lazyloading them...
			if(!thisT.settings)
			{
			   var typeIndex = ijf.fw.CustomTypes.indexOf(thisT);

				//load the settings...
               var fullTypeRaw = ijfUtils.jiraApiSync('GET',g_root + '/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId='+thisT.id, null);
			   var cleanDoubleDouble = fullTypeRaw.replace(/\"\"/g,"\"");
			   cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
			   cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");
			   thisT = JSON.parse(cleanDoubleDouble);

			   //update local memory
			   ijf.fw.CustomTypes.splice(typeIndex, 1);
			   ijf.fw.CustomTypes.push(thisT);
			}

			//data may be crlf list, crlf list of tab delimited, JSON
			//try json first...
			try
			{
				retRef = JSON.parse(thisT.settings);
				//try again, if it parses, return it. else
				try
				{
					retRef =JSON.parse(retRef);
				}
				catch(ee)
				{
					retRef = retRef.split("\n");
					//look for CSV....
					if(retRef[0].indexOf("\t")>-1)
					{
						var i = 0;

						var lookup = retRef.map(function(r)
						{
							i=0;
							return r.split("\t").reduce(function(inObj, c){ inObj[i.toString()]=c.trim();i++;return inObj;},{});
						});
						retRef=lookup;
					}
					else if(retRef[0].indexOf(",")>-1)
					{
						var i = 0;
						var lookup = retRef.map(function(r)
						{
							i=0;
							return r.split(",").reduce(function(inObj, c){ inObj[i.toString()]=c.trim();i++;return inObj;},{});
						});
						retRef=lookup;
					}
					else{
						var lookup = retRef.map(function(r)
						{
							return {"0":r};
						});
						retRef=lookup;
					};
				}
			}
			catch(e)
			{
				//not json split as \n, then \t
				retRef = thisT.settings.split("\n");
			}
		}
		return retRef;
	},
Base64Binary: {

	arrayBufferToBase64:function( buffer ) {
		var binary = '';
		var bytes = new Uint8Array( buffer );
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode( bytes[ i ] );
		}
		return window.btoa( binary );
	},
	base64ToArrayBuffer:function(base64) {
		var binary_string =  window.atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array( len );
		for (var i = 0; i < len; i++)        {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	}

},
getUuid:function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
},
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
detectIE:function() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
},

sharepointFilenameOk:function(inFileName)
{
  var fSplit = inFileName.split(".");
  if(fSplit.length>2) return false; //has a . in name
  var invalidChars = "',~\"#%&*:<>?/\\{|}";
  for(var i=0;i<invalidChars.length;i++)
  {
      if(fSplit[0].indexOf(invalidChars[i])>-1) return false;
  }
  return true;
},

sharepointFilenameClean:function(inFileName)
{
  var fSplit = inFileName.split(".");
  var fNameNoPeriods = fSplit[0];
  var fNameSuffix = null;
  if(fSplit.length>1)
  {
	  fNameNoPeriods = fSplit.slice(0,fSplit.length-1).join("_");
      fNameSuffix= fSplit[fSplit.length-1];
  }

  //var invalidChars = ",~\"#%&*:<>?/\\{|}";
  var invalidChars = ["'",",","~","\\\"","\\#","\\%","\\&","\\*","\\:","\\<","\\>","\\?","/","\\\\","{","\\|","}"];
  for(var i=0;i<invalidChars.length;i++)
  {
	  fNameNoPeriods = fNameNoPeriods.replace(new RegExp(invalidChars[i], 'g'), "_");
  }

  if(fNameSuffix) return fNameNoPeriods + "." + fNameSuffix;
  return fNameNoPeriods;
}




};

