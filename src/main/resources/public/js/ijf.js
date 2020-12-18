/**
 * Created with JetBrains RubyMine.
 * User: mp3531
 * Date: 2/24/15
 * Time: 11:24 AM
 * To change this template use File | Settings | File Templates.
 */
var pWin;
var dWin;
var dWinVal=false;
var debug = 'true';

document.onreadystatechange = function () {

    if (document.readyState === 'complete') {
        exerciseId=g_exerciseId;
        itemId=window.g_itemId;
        formName=window.g_formId;

        //look for exercise ID, then error if not available...

        if(exerciseId=="")
        {
            $('#mwfContent').html("<div style='text-align: center; color: royalblue'>" +
                "Sorry but no exercise id was included in your call.<br>" +
                "Please make your url include ?exerciseId=[myexerciseid]<br>");
        }
        else
        {
            //init messaging
//            if (typeof window.postMessage !== undefined)
//            {
//                footLog("postMessage API is initialized!");
//                window.addEventListener("message", mwfUtils_messageHandler, true);
//            }
//            else
//            {
//                footLog("postMessage API is NOT supported!");
//            }


            $.receiveMessage(mwfUtils_messageHandler);

            showProgress();
            mwf_init();

        }

        window.onbeforeunload=null;



    }
}
//$(document).ready(function(){
//});

function modalDialog(inTitle,inMessage,inFunction)
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
               // alert('ok');

                dWin.close();
                if(inFunction!=null)
                        inFunction();

            }},
            {
                text:'Cancel',
                handler: function(){
                    dWin.close();
                }}
        ],
        modal: true
    });
    dWin.show();
}

function modalDialogMessage(inTitle,inMessage)
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
            }}
        ],
        modal: true
    });
    dWin.show();

}


function modalDialogMessageWithFunction(inTitle,inMessage,inFunction)
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

}



function showProgress()
{


    if(Ext.getCmp('pbar3')) return;

    var pdiv = "<div id='progress1inner' style=\"position: relative; left: -50%; border:solid lightblue 0px;\"></div>";


    pWin = new Ext.Window({
        layout: 'fit',
        title: 'Processing',
        width: 200,
        height: 50,
        closable: false,
        items: {
            html: pdiv,
            xtype: "panel"},
        modal: true
    });
    pWin.show();

    var pbar1 = new Ext.ProgressBar({
        id:'pbar3',
        layout: 'fit',
        width:300,
        renderTo:'progress1inner'
    });

    pbar1.wait({
        interval:100,
        increment:15
    });

}

function hideProgress(focusTop)
{
    //$('#progress1').html("");
    if(Ext.getCmp('pbar3'))
    {
        pWin.close();
        Ext.getCmp('pbar3').destroy();
    }
    //$('#mwfContent').show();
    if (focusTop == true) {
       new Ext.Window({ header: false, closable: false, frame: false, baseCls: 'x-panel', cls: 'x-window', height: 1, width: 1}).showAt(-48,-48).destroy();
    }
}


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
