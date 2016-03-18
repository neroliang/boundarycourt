//////////////////////////////////////////////////////////
//      WELMAN WEBROOMS: INTEGRATION SCRIPT           //
//             Welman Technologies Ltd                  //
//             http://www.welman.co.nz                  //
//           ver: Friday, 12 August 2011                //
//////////////////////////////////////////////////////////
//   NOTE: This script has been dynamically generated,  //
//  using settings for a specific customer. It changes  //
//           frequently and without warning.            //
//                                                      //
//      PLEASE EXTERNALLY REFERENCE THIS FILE!          //
//      -Do not store it on your own web host-          //
//                                                      //
//     Contact Welman Technologies for assistance.      //
//             http://www.welman.co.nz                  //
//////////////////////////////////////////////////////////


// 12/08/2011 12:19:46 p.m.

var rwrSiteId = 299;
var rwrTargetUrl = '';
var rwrTargetWinName = 'bookings';
var rwrInDateIxOffset = 0;
var rwrOutDateIxOffset = 1;
var rwrMaxOutDateIx = 4261;
var maxDaysInAdvance = 365;
var displayType = 1;
var goButtonLabel = 'GO';
var rootDate = new Date();
rootDate.setFullYear(2000,11,31);
var dateToday = new Date();
//dateToday.setFullYear(2011,7,12);
var rwrOne_Day_Ms = 1000*60*60*24;


//

function insertDatePicker2(sId)
{
	// adds a date picker using a block element
	// myDatePicker accessible outside of scope by necessity
	
	myDatePicker2 = new rwr_ResMask(sId,'myDatePicker2');	
	
	var sDatePickerHtml = myDatePicker2.getHtml();
	
	document.getElementById(sId).innerHTML = sDatePickerHtml;
	
	rwr_dpInit(sId);
	
}

function insertDatePicker(sId)
{
	// adds a date picker using a block element
	// myDatePicker accessible outside of scope by necessity
	
	myDatePicker = new rwr_ResMask(sId,'myDatePicker');	
	
	var sDatePickerHtml = myDatePicker.getHtml();
	
	document.getElementById(sId).innerHTML = sDatePickerHtml;
	
	rwr_dpInit(sId);
	
}

function insertBookingEngine(sId)
{ // creates iframe with booking engine embedded, using a block element
	
	//var sHtml = '<iframe id="rwrBookingFrame" src="http://bookings.web-rooms.co.nz/Home.html?pid='+rwrSiteId+'" width="100%" height="2500" frameborder="0">'
	var sHtml = '<iframe id="rwrBookingFrame" src="http://bookings.web-rooms.co.nz/_Empty.html" width="100%" height="2500" frameborder="0">'
	sHtml += 'Your browser must suppport frames to use our online booking system.<br/>';
	sHtml += 'Please contact us directly.';
	sHtml += '</iframe>';
		
			
	document.getElementById(sId).innerHTML = sHtml;
	
	setBookingDates();
	
}



function rwr_dpInit(sIdent)
{
	var oCheckIn = document.getElementById('cid_'+sIdent);
	var oCheckOut = document.getElementById('cod_'+sIdent);
	
	rwr_setDate(oCheckIn,dateToday);
	rwr_setDate(oCheckOut,dateToday);
	rwr_dpEval(oCheckIn);	
	rwr_dpEval(oCheckOut);
	
	rwr_catch = 0;
	
}


function writeDebug(sDebug)
{
	
	try
	{
		document.getElementById('rwr_debug').innerHTML += sDebug + '<br/>';
	}catch(Err){}
		
}

function rwr_dpEval(oControl)
{
		
	
	
	rwr_setDayLabel(oControl);
	
	var sIdent = oControl.id.split('_')[1];
	
	var oCheckIn = document.getElementById('cid_'+sIdent);
	var oCheckOut = document.getElementById('cod_'+sIdent);
	
	var dCheckInDate = rwr_getDate(oCheckIn);
	var dCheckOutDate = rwr_getDate(oCheckOut);
	
	var dCheckOutDateNextMonth = new Date()
	dCheckOutDateNextMonth.setTime(dCheckOutDate.getTime());	
	dCheckOutDateNextMonth.setMonth(dCheckOutDate.getMonth()+1);
	
	var iCheckInDateIx = dateToIx(dCheckInDate);
	var iCheckOutDateIx = dateToIx(dCheckOutDate);	
		
	var thisDateNextMonth = new Date()
	thisDateNextMonth.setTime(dCheckInDate.getTime());	
	thisDateNextMonth.setMonth(dCheckInDate.getMonth()+1);
	
	if(iCheckInDateIx < dateToIx(dateToday))
	{
		
		rwr_setDate(oCheckIn,thisDateNextMonth);
		return rwr_dpEval(oCheckIn);
	}
	
	
	if(iCheckOutDateIx < iCheckInDateIx && iCheckOutDateIx < dateToIx(dateToday))
	{
		
		rwr_setDate(oCheckOut,dCheckOutDateNextMonth);
		
		return rwr_dpEval(oCheckOut);
	}
		
	
	if(iCheckOutDateIx > rwrMaxOutDateIx)
	{
		rwr_setDate(oCheckOut,rwrMaxOutDateIx);
		return rwr_dpEval(oCheckOut);
	}
	
	
	if(iCheckInDateIx >= iCheckOutDateIx)
	{
		
		switch(oControl.id.substr(0,2))
		{
			case 'ci':
				
				rwr_setDate(oCheckOut,ixToDate(iCheckInDateIx));		
				return rwr_dpEval(oCheckOut);
				break;
				
			case 'co':
				
				rwr_setDate(oCheckIn,ixToDate(iCheckOutDateIx-2));
				return rwr_dpEval(oCheckIn);
				break;	
		}
		
	}	
	
	return true;
}


function zeroPad(int)
{
	var sResult = '';
	if(int<10)
	{
		sResult = '0'+''+int;
	}else{
		sResult = ''+int;
	}
	return sResult;
}

function rwr_dpSubmit(oResMask)
{
	
	var monthName = Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
	
	var sIdent = oResMask._ident;
	
	var oCheckIn = document.getElementById('cid_'+sIdent);
	var oCheckOut = document.getElementById('cod_'+sIdent);
	
	var dCheckInDate = rwr_getDate(oCheckIn);
	var dCheckOutDate = rwr_getDate(oCheckOut);
	
	var sQuery;
	sQuery = 'datein='+dCheckInDate.getFullYear()+'-'+
											zeroPad(dCheckInDate.getMonth()+1)+'-'+
											zeroPad(dCheckInDate.getDate());
											
	sQuery += '&dateout='+dCheckOutDate.getFullYear()+'-'+
											zeroPad(dCheckOutDate.getMonth()+1)+'-'+
											zeroPad(dCheckOutDate.getDate());
	
		
	
	var sTargetUrl = 'http://www.seekom.com/accommodation/Property.php?op=boundary43&pid=5516&' + sQuery;
	
	
	try
	{
		
		sTargetUrl = pageTracker._getLinkerUrl(sTargetUrl);
	}catch(e)
	{
		sTargetUrl = sTargetUrl;
	}
	
		
	switch(oResMask._targetWinName)
	{
		case '_blank':
			window.open(sTargetUrl,'');
			break;	
			
		case '_self':
		case '':
			window.location = sTargetUrl;
			break;
			
		default:
			window.open(sTargetUrl,oResMask._targetWinName);
			break;
	}	
	
	return true;
}

function rwr_setDate(oControl,dNewDate)
{ // sets given date control to the given date, including day label
	
	var oDay,oMonthYear;
	var sIdent = oControl.id.split('_')[1];	
	//alert(oControl.id);
	switch(oControl.id.substr(0,2))
	{
		case 'ci':
			oDay = document.getElementById('cid_'+sIdent);
			oMonthYear = document.getElementById('cimy_'+sIdent);
			break;
			
		case 'co':
			oDay = document.getElementById('cod_'+sIdent);
			oMonthYear = document.getElementById('comy_'+sIdent);
			break;	
	}
	
	
	oDay.value = dNewDate.getDate();
	oMonthYear.value = (dNewDate.getMonth()+1)+'-'+dNewDate.getFullYear();
	
	rwr_setDayLabel(oControl);
	
}

function rwr_getDate(oControl)
{ // returns a jsDate object for the given date control
	// if the month evaluated is different from that in the control, reset the control to the new date
	
	var oDay,oMonthYear;
	var sIdent = oControl.id.split('_')[1];
	
	var iDay,iMonth,iYear;
	
	switch(oControl.id.substr(0,2))
	{
		case 'ci':
			oDay = document.getElementById('cid_'+sIdent);
			oMonthYear = document.getElementById('cimy_'+sIdent);
			break;
			
		case 'co':
			oDay = document.getElementById('cod_'+sIdent);
			oMonthYear = document.getElementById('comy_'+sIdent);
			break;	
	}
	
	var dReturn = new Date();
	
	iDay = parseInt(oDay[oDay.selectedIndex].value,10);
	iMonth = parseInt(oMonthYear[oMonthYear.selectedIndex].value.split('-')[0],10);
	iYear = parseInt(oMonthYear[oMonthYear.selectedIndex].value.split('-')[1],10);
	
	dReturn.setFullYear(iYear,
											iMonth-1,
											iDay);
	
	if(iMonth-1 != dReturn.getMonth())
	{
		rwr_setDate(oControl,dReturn);
	}	
											
	return dReturn;
	
}


function rwr_setDayLabel(oControl)
{ // sets the appropriate day label
	
	var sLabelId;	
	var sIdent = oControl.id.split('_')[1];
	var weekdays = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
	
	switch(oControl.id.substr(0,2))
	{
		case 'ci':
			sLabelId = 'checkInDayLabel_'+sIdent;
			break;
			
		case 'co':
			sLabelId = 'checkOutDayLabel_'+sIdent;
			break;	
	}	
	
	var oDayLabel = document.getElementById(sLabelId);
	var dSetDate = rwr_getDate(oControl);
	
	oDayLabel.innerHTML = weekdays[dSetDate.getDay()];
	
	//alert('rwr_setDayLabel');
	
}


function rwr_ResMask(ident,objName)
{
	if(ident == null)
	{
		ident = 'default';
	}
	
	var oResMask = this;
	
	this._ident = ident;
	this._objName = objName;
	this._displayType = displayType;
	this._targetUri = rwrTargetUrl;
	this._targetWinName = rwrTargetWinName;
	this._inDateIxOffset = rwrInDateIxOffset;
	this._outDateIxOffset = rwrOutDateIxOffset;
	this._maxOutDateIx = rwrMaxOutDateIx;
	this._maxDaysInAdvance = maxDaysInAdvance;
	this._goButtonLabel = goButtonLabel;
	this._rooms = '';
	this._checkInDateLabel = 'Check In:';	
	this._checkOutDateLabel = 'Check Out:';
	
	this._checkInDate = new Date();
	
	this._displayType_block = 1;
	this._displayType_wide = 2;
	this._displayType_single = 3;
	
		
	this.getHtml = function()
	{
		var sHtml;		
		var buttonColSpan;
		
		switch(this._displayType)
		{
			case this._displayType_block:
				buttonColSpan = 2;
				break;
				
			case this._displayType_wide:
				buttonColSpan = 4;
				break;
				
			case this._displayType_single:
			
				break;	
		}
		
		var maxDate = new Date();
		
		
		maxDate.setDate(dateToday.getDate()+this._maxDaysInAdvance);
		maxDate.setDate(20);
		
		
		var dDate;
		var monthName = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
		
					
		sHtml = '<div class="rwr_block" id="rwrDatePicker_'+ident+'">';
			
			//sHtml+= '<input type="hidden" id="rooms_'+ident+'" value="'+this._rooms+'"/>';
			
			sHtml+= '<table border="0" cellspacing="0" cellpadding="1" class=""rwr_table"">';
				sHtml += '<tr>';
					sHtml += '<td colspan="2">';
						sHtml += '<div class="rwr_label">'+this._checkInDateLabel+'</div>';
					sHtml += '</td>';
				
				if(this._displayType == this._displayType_block)
				{
					sHtml += '</tr>';				
					sHtml += '<tr>';
				}
				
					sHtml += '<td>';
						sHtml += '<div class="rwr_dayLabel" style="text-align:right;width:35px;" id="checkInDayLabel_'+ident+'"></div>';
					sHtml += '</td>';
					
					sHtml += '<td nowrap>';
						
						sHtml += '<select class="rwr_picker" id="cid_'+ident+'" onchange="return rwr_dpEval(this);">';
							for(var i=1;i<=31;i++)
							{
								sHtml += '<option value="'+i+'">'+i+'</option>';
							}
						sHtml += '</select>';
						sHtml += '<select class="rwr_picker" id="cimy_'+ident+'" onchange="return rwr_dpEval(this);">';
							
							dDate = new Date();
							dDate.setDate(15);
							while(dDate.getTime() < maxDate.getTime())
							{							
								dDate.setDate(15);
								sHtml += '<option value="'+(dDate.getMonth()+1)+'-'+dDate.getFullYear()+'">';
									sHtml += monthName[dDate.getMonth()];
									sHtml += ' ';
									sHtml += dDate.getFullYear();
								sHtml += '</option>';
								dDate.setDate(dDate.getDate()+30);
							}
							
						sHtml += '</select>';
						
					sHtml += '</td>';
				
				switch(this._displayType)	
				{
					case this._displayType_block:
					case this._displayType_wide:
						sHtml += '</tr>';				
						sHtml += '<tr>';
						break;
						
					case this._displayType_single:
						sHtml += '<td>';
							sHtml += '&nbsp;&nbsp;&nbsp;';
						sHtml += '</td>';			
						break;
						
				}
				
					sHtml += '<td colspan="2">';
						sHtml += '<div class="rwr_label">'+this._checkOutDateLabel+'</div>';
					sHtml += '</td>';
				
				if(this._displayType == this._displayType_block)
				{
					sHtml += '</tr>';				
					sHtml += '<tr>';
				}			
				
					sHtml += '<td>';
						sHtml += '<div class="rwr_dayLabel" style="text-align:right;width:35px;" id="checkOutDayLabel_'+ident+'"></div>';
					sHtml += '</td>';
					
					sHtml += '<td nowrap>';
						
						sHtml += '<select class="rwr_picker" id="cod_'+ident+'" onchange="return rwr_dpEval(this);">';
							for(var i=1;i<=31;i++)
							{
								sHtml += '<option value="'+i+'">'+i+'</option>';
							}
						sHtml += '</select>';
						sHtml += '<select class="rwr_picker" id="comy_'+ident+'" onchange="return rwr_dpEval(this);">';
							
							dDate = new Date();
							dDate.setDate(15);
							while(dDate.getTime() < maxDate.getTime())
							{							
								dDate.setDate(15);
								sHtml += '<option value="'+(dDate.getMonth()+1)+'-'+dDate.getFullYear()+'">';
									sHtml += monthName[dDate.getMonth()];
									sHtml += ' ';
									sHtml += dDate.getFullYear();
								sHtml += '</option>';
								dDate.setDate(dDate.getDate()+30);
							}
							
						sHtml += '</select>'
						
					sHtml += '</td>'
				
				if(this._displayType != this._displayType_single)
				{
					sHtml += '</tr>';
					sHtml += '<tr>';					
				}
				 
					sHtml += '<td colspan="'+buttonColSpan+'" align="right">';
						sHtml += '<input class="rwr_button" title="Check our Rates, Live Availability and Book Online" type="button" id="go_'+ident+'" value="'+this._goButtonLabel+'" onclick="return rwr_dpSubmit('+this._objName+');"/>';
					sHtml += '</td>';
					
				sHtml += '</tr>';
				
			sHtml += '</table>'	
			
		sHtml += '</div><div id="rwr_debug"></div>';
		
		return sHtml;
	};
		
}

function dateToIx(myDate)
{ // returns the ix  represented by the given jsDate
	
		
	var iResult = myDate.getTime() -  rootDate.getTime();
	iResult = Math.ceil(iResult / rwrOne_Day_Ms,0);
//	iResult += 1;
	return iResult;
	
}

function ixToDate(ix)
{ // returns the jsDate represented by the given ix
	
	var dResult = new Date();
	dResult.setTime(rootDate.getTime() + (rwrOne_Day_Ms*ix))
	
	return dResult;
	
}


function setBookingDates()
{	// passes querystring args to rwr iframe						
			
	var bookingFrame = document.getElementById('rwrBookingFrame');
	var dateQuery = window.location.search;
	
	var frameSrc;
	
	if(dateQuery.length > 0)
	{		
		frameSrc = 'http://bookings.web-rooms.co.nz/Home.html'+dateQuery+'&pid='+rwrSiteId;
	}else{
		frameSrc = 'http://bookings.web-rooms.co.nz/Home.html?pid='+rwrSiteId;
	}
		
	setTimeout('trackBookingFrame(\''+frameSrc+'\');',1000);
	
		
	return true;												
}

function trackBookingFrame(sFrameSrc)
{
	var bookingFrame = document.getElementById('rwrBookingFrame');
		
	try
	{
		
		bookingFrame.src = pageTracker._getLinkerUrl(sFrameSrc);
	}catch(e)
	{
		bookingFrame.src = sFrameSrc;
	}
}

function webRoomsDatePicker()
{
	// adds a date picker inline using document.write (deprecated)
	// myDatePicker accessible outside of scope by necessity
	
	var myIdent = 'webRoomsDatePicker';
	
	myDatePicker = new rwr_ResMask(myIdent,'myDatePicker');	
	
	document.write(myDatePicker.getHtml());
	
	rwr_dpInit(myIdent);
	
}

function insertBookingSystem()
{ // creates iframe with booking engine embedded, using document.write (deprecated)
	
	var sHtml = '<iframe id="rwrBookingFrame" src="http://bookings.web-rooms.co.nz/_Empty.html" width="100%" height="2500" frameborder="0">'
	sHtml += 'Your browser must suppport frames to use our online booking system.<br/>';
	sHtml += 'Please contact us directly.';
	sHtml += '</iframe>';
		
		
	document.write(sHtml);
	
	setBookingDates();
	
}


<!--0-->