$(document).ready(function() {

	let sum_cost;
	let url = window.location.href;
	countPrice();

	let status = "error";

	$(".modal__submit-status").on("click", function(event) {
		countPrice();
        history.pushState(null, null, url);
		$(".modal").removeClass("modal-error modal-success");
	});

	$("#form").on("submit", function(event) {
		event.preventDefault();
		$(this).find(".modal__submit").html("<img class='modal__loader' src='img/loader.gif' alt=''>");
		setTimeout(function() {
			if (status == "error") {
				$(".modal").addClass("modal-error");
				status = "ok";
        		var newUrl = url + 'paymenterror';
        		history.pushState(null, null, newUrl);
			}
			else {
				$(".modal").addClass("modal-success");
				status = "error";
        		var newUrl = url + 'paymentsuccess';
        		history.pushState(null, null, newUrl);
			}
		}, 4000);		
	});

	$(".modal__title-more").on("click", function(event) {
		event.preventDefault();
		if (!$(".new-products").hasClass("new-products-appear")) {
			$(".new-products").css("z-index", "1");
			$(".new-products").addClass("new-products-appear");
		}
	});

	$(".new-products__submit").on("click", function(event) {
		event.preventDefault();
		var count = $('.choose__input[name=count-product]:checked').val();
		var products = 0, cost = 0;
		switch (count) {
			case "choose-5":
				products = 5;
				cost = 16;
				break;
			case "choose-4":
				products = 4;
				cost = 18;
				break;
			case "choose-3":
				products = 3;
				cost = 20;
				break;
			case "choose-2":
				products = 2;
				cost = 22;
				break;
			case "choose-1":
				products = 1;
				cost = 24.99;
				break;
		}
		for (var i = 0; i < products; i++) {
			$(".modal__products").append('\
				<div class="modal__item modal__item-form modal__item-product" data-cost="'+cost+'">	\
					<div class="modal__title">Product 1</div>\
					<div class="modal__subtitle">Enter main keyword for the product</div>\
					<input class="modal__input" type="text" placeholder="for example, sylicon wine cup" required>\
					<div class="modal__subtitle">Enter link to the similar product as a reference</div>\
					<input class="modal__input" type="text" placeholder="https://..." required>\
				</div>\
			');
		}
		countProducts();
		countPrice();
		$(".new-products").removeClass("new-products-appear");
		setTimeout(function() {
			$(".new-products").css("z-index", "-1");
		}, 500);
	});

	$(".modal__products").on("click", ".modal__remove", function(event) {
		event.preventDefault();
		$(this).parent().parent().remove();
		countProducts();
		countPrice();
	});

	function countProducts() {
		$(".modal__item-product").each(function(i) {
			if (i != 0) {
				$(this).find(".modal__title").html("Product " + ++i +" <img class='modal__remove' src='img/icon_remove.svg' alt=''>");
			} 
		});
	}

	function countPrice() {
		sum_cost = 0;
		$(".modal__item-product").each(function() {
			sum_cost += Number($(this).attr("data-cost"));
		});
		$("#form").find(".modal__submit").html("Submit and Pay&nbsp;<span>" + sum_cost.toFixed(2) + " USD</span>");
	}
});