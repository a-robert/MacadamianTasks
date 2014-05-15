$(document).ready(function () {
	var selectedId;
	var selectedItem;
	var elementID = ["element1"];
	var elementNumber = 1;

	$(".element").on('contextmenu', function (e) {
		selectedId = $(this).attr('id');
		selectedItem = $(this).attr('id') + "Item";
		$("#popUpMenu").css("top",e.pageY);
	  	$("#popUpMenu").css("left",e.pageX);
		$("#popUpMenu").show(100);
		return false;
	});

	$("#left").click(function () {
		$('#popUpMenu').hide(100);
		$('#editStyle').hide(100);
		$('#addItem').hide(100);
		$('#deleteElement').hide(100);
	});

	$("#add").click(function (e) {
		$("#popUpMenu").hide(100);
		$("#addItem").css("top",e.pageY);
	  	$("#addItem").css("left",e.pageX);
		$("#addItem").show(100);
	});

	$("#addItemSubmit").click(function () {
		var newElementType = $("#itemType").val();
		var newElementId = $("#itemId").val();
		if (elementID.indexOf(newElementId)>=0) {
			return alert("Element with ID " + newElementId + " exist, Enter another ID");
		}
		elementNumber += 1;
		var newElementName = $("#itemName").val();
		var newElementContent = $("#itemContent").val();
		if(!newElementId) {
			newElementId = "element" + elementNumber;
		}
		if(!newElementContent) {
			newElementContent = "";
		}


		var newElement = $('<div />');
		newElement.attr('class', 'element');
		var newElementItem = $('<' + newElementType + '/>');
		newElementItem.attr('class', 'item');

		switch (newElementType) {
			case "a": {
				var href = prompt("Please Enter Link Value");
				newElementItem.attr('href', href);
				break;
			}

			case "img": {
				var source = prompt("Please Enter Image Source");
				newElementItem.attr('src', source);
				break;
			}

			default: {
				break;
			}
		}

		newElement.attr('id', newElementId);
		newElement.append(newElementName);
		elementID.push(newElementId);
		var newElementLeftPos = parseInt($("#" + selectedId).css('left').slice(0,-2)) + 20 + 'px';
		newElement.css('left', newElementLeftPos);

		$("#" + selectedId).append(newElement);
		var parentItem = selectedId + "Item";

		newElementItem.attr('id', newElementId + "Item");
		newElementItem.append(newElementContent);
		$("#" + parentItem).append(newElementItem);
		$("#addItem").hide(100);
	});

	$("#edit").click(function (e) {
		if (selectedId=="root") {
			return false;
		};
		$("#popUpMenu").hide(100);
		$("#editStyle").css("top",e.pageY);
	  	$("#editStyle").css("left",e.pageX);
		$("#editStyle").show(100);
	});

	$("#styleSubmit").click(function () {
		var styleName = $("#styleName").val();
		var styleValue = $("#styleValue").val();
		var itemId = "#" + selectedId + "Item";
		$(itemId).css(styleName, styleValue);
		$("#editStyle").hide(100);
	});

	$("#delete").click(function (e) {
		if (selectedId=="root") {
			return false;
		};
		$("#popUpMenu").hide(100);
		$("#deleteElement").css("top",e.pageY);
	  	$("#deleteElement").css("left",e.pageX);
		$("#deleteElement").show(100);
	});

	$("#deleteYes").click(function () {
		$("#" + selectedId).remove();
		$("#" + selectedId + "Item").remove();
		$('#deleteElement').hide(100);
	});

	$("#deleteNo").click(function () {
		$('#deleteElement').hide(100);
	})

});