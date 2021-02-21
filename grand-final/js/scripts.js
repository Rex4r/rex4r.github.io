jQuery(function($) {
	let dataToggle = true;
	let isFirst = true;
	let getData = function(callback) {
		let demoData;
		let data1 = {
			0: {
				"id": 0,
				"picture": "img/1.png",
				"is_lighted": "True",
				"name": "Team 1",
				"points_sum": "100"
			},
			1: {
				"id": 1,
				"picture": "img/2.png",
				"is_lighted": "True",
				"name": "Team 2",
				"points_sum": "98"
			},
			2: {
				"id": 2,
				"picture": "img/3.png",
				"is_lighted": "True",
				"name": "Team 3",
				"points_sum": "90"
			},
			3: {
				"id": 3,
				"picture": "img/4.png",
				"is_lighted": "True",
				"name": "Team 4",
				"points_sum": "85"
			},
			4: {
				"id": 4,
				"picture": "img/5.png",
				"is_lighted": "True",
				"name": "Team 5",
				"points_sum": "82"
			},
			5: {
				"id": 5,
				"picture": "img/6.png",
				"is_lighted": "True",
				"name": "Team 6",
				"points_sum": "70"
			},
			6: {
				"id": 6,
				"picture": "img/7.png",
				"is_lighted": "True",
				"name": "Team 7",
				"points_sum": "65"
			},
			7: {
				"id": 7,
				"picture": "img/8.png",
				"is_lighted": "True",
				"name": "Team 8",
				"points_sum": "67"
			}
		};
		let data2 = {
			0: {
				"id": 2,
				"picture": "img/3.png",
				"is_lighted": "True",
				"name": "Team 3",
				"points_sum": "110"
			},
			1: {
				"id": 0,
				"picture": "img/1.png",
				"is_lighted": "False",
				"name": "Team 1",
				"points_sum": "100"
			},
			2: {
				"id": 1,
				"picture": "img/2.png",
				"is_lighted": "False",
				"name": "Team 2",
				"points_sum": "98"
			},
			3: {
				"id": 3,
				"picture": "img/4.png",
				"is_lighted": "False",
				"name": "Team 4",
				"points_sum": "85"
			},
			4: {
				"id": 4,
				"picture": "img/5.png",
				"is_lighted": "False",
				"name": "Team 5",
				"points_sum": "82"
			},
			5: {
				"id": 6,
				"picture": "img/7.png",
				"is_lighted": "True",
				"name": "Team 7",
				"points_sum": "65"
			},
			6: {
				"id": 5,
				"picture": "img/6.png",
				"is_lighted": "False",
				"name": "Team 6",
				"points_sum": "70"
			},
			7: {
				"id": 7,
				"picture": "img/8.png",
				"is_lighted": "False",
				"name": "Team 8",
				"points_sum": "67"
			}
		};
		let data3 = {
			0: {
				"id": 0,
				"picture": "img/1.png",
				"is_lighted": "True",
				"name": "Team 1",
				"points_sum": "100"
			},
			1: {
				"id": 1,
				"picture": "img/2.png",
				"is_lighted": "True",
				"name": "Team 2",
				"points_sum": "98"
			},
			2: {
				"id": 2,
				"picture": "img/3.png",
				"is_lighted": "False",
				"name": "Team 3",
				"points_sum": "90"
			},
			3: {
				"id": 3,
				"picture": "img/4.png",
				"is_lighted": "False",
				"name": "Team 4",
				"points_sum": "85"
			},
			4: {
				"id": 4,
				"picture": "img/5.png",
				"is_lighted": "False",
				"name": "Team 5",
				"points_sum": "82"
			},
			5: {
				"id": 5,
				"picture": "img/6.png",
				"is_lighted": "True",
				"name": "Team 6",
				"points_sum": "70"
			},
			6: {
				"id": 6,
				"picture": "img/7.png",
				"is_lighted": "False",
				"name": "Team 7",
				"points_sum": "65"
			},
			7: {
				"id": 7,
				"picture": "img/8.png",
				"is_lighted": "False",
				"name": "Team 8",
				"points_sum": "67"
			}
		};
		if (isFirst) {
			demoData = data1;
			isFirst = false;
		} else {
			demoData = dataToggle ? data2 : data3;
			dataToggle = !dataToggle;
		}
		callback(demoData);
	};

	let renderResults = function(data) {
		jQuery.each(data, function(index, value) {
			let html = `<div class="result__item result__item_id-${value.id} result__item_position-${+index+1} ${value.is_lighted === "True" ? 'result__item_lighted' : ''}">
      <div class="result__num">${+index+1}</div>
      <img src="${value.picture}" alt="" class="result__logo">
      <div class="result__name">${value.name}</div>
      <div class="result__scores">${value.points_sum}</div>
    </div>`;
			$(".result").append(html);
		})
	};

	let updateResults = function(data) {
		jQuery.each(data, function(index, value) {
			let $item = $(".result__item_id-"+value.id);
			$item.removeClass("result__item_position-1 result__item_position-2 result__item_position-3 result__item_position-4 result__item_position-5 result__item_position-6 result__item_position-7 result__item_position-8").addClass("result__item_position-" + (+index+1));
			$item.toggleClass("result__item_lighted", value.is_lighted === "True");
			$item.find(".result__num").text(+index+1);
			$item.find(".result__scores").text(value.points_sum);
		})
	};

	getData(renderResults);

	setInterval(function() {
		getData(updateResults);
	}, 3000);
});
