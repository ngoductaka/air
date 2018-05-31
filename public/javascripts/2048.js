$( document ).ready(function() {
    
console.log(111);

$( "#start" ).hide(10100, function() {
console.log(22);

    // Animation complete.
  });
var l = 3;
var dndCheck=0;
$("#fail").hide();

var begin1=[
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
var begin=[
			[2,4,2,4],
			[4,2,4,2],
			[2,4,2,4],
			[4,2,4,2]
		];
/*
dnd is array 2 multiple
where is string: "up" or "down" or "left" or "right"
*/
function move(dnd,where) {
	if (where == "up") {
		// return 1;
		for (var i = 0; i<=l; i++) {
			for (var j = 0; j<=l; j++) {
				var u=j+1;
				if (u<=l) {
					if (dnd[j][i]==dnd[u][i]) {
						dnd[j][i]+=dnd[u][i];
						dnd[u][i]=0;
					}
				}
			}
		}
		return dnd;
	} else if (where == "down") {
		for (var i = l; i>=0; i--) {
			for (var j = l; j>=0; j--) {
				var d=j-1;
				if (d>=0) {
					if (dnd[j][i]==dnd[d][i]) {
						dnd[j][i]+=dnd[d][i];
						dnd[d][i]=0;
					}
				}
			}
		}
		return dnd;

	} else if (where == "left") {
		for (var i = 0; i<=l; i++) {
			for (var j = 0; j<=l; j++) {
				var f=j+1;
				if (f<=l) {
					if (dnd[i][j]==dnd[i][f]) {
						dnd[i][j]+=dnd[i][f];
						dnd[i][f]=0;
					}
				}
			}
		}
		return dnd;
		
	} else if (where == "right") {
		for (var i = l; i>=0; i--) {
			for (var j = l; j>=0; j--) {
				var r=j-1;
				if (r>=0) {
					if (dnd[i][j]==dnd[i][r]) {
						dnd[i][j]+=dnd[i][r];
						dnd[i][r]=0;
					}
				}
			}
		}
		return dnd;
		
	} else {
		return " sai roi ma"
	}
}
// assign zero
function sortZero(dnd,where) {
	if (where=="up") {
		if (check(dnd,"up")) {
			return dnd;
		} else {
			for (var i = 0; i<=l; i++) {
				for (var j = 0; j<=l; j++) {
					var u=j+1;
					if (u<=l) {
						if (dnd[j][i]==0 && dnd[u][i]!=0) {
							dnd[j][i]=dnd[u][i];
							dnd[u][i]=0;
						}
					}
				}
			}
			// return dnd;
			return sortZero(dnd,"up");
		}
	} else if (where == "down") {
		if (check(dnd,"down")) {
			return dnd;
		} else {
			for (var i = l; i>=0; i--) {
				for (var j = l; j>=0; j--) {
					var d=j-1;
					if (d>=0) {
						if (dnd[j][i]==0 && dnd[d][i]!=0) {
							dnd[j][i]=dnd[d][i];
							dnd[d][i]=0;
						}
					}
				}
			}
			// return dnd;
			return sortZero(dnd,"down");
		}
	} else if (where == "left") {
		if (check(dnd,"left")) {
			return dnd;
		} else {
			for (var i = 0; i<=l; i++) {
				for (var j = 0; j<=l; j++) {
					var f=j+1;
					if (f<=l) {
						if (dnd[i][j]==0 && dnd[i][f]!=0) {
							dnd[i][j]=dnd[i][f];
							dnd[i][f]=0;
						}
					}
				}
			}
			// return dnd;
			return sortZero(dnd,"left");
		}
	} else if (where == "right") {
		if (check(dnd,"right")) {
			return dnd;
		} else {
			for (var i = l; i>=0; i--) {
				for (var j = l; j>=0; j--) {
					var r=j-1;
					if (r>=0) {
						if (dnd[i][j]==0 && dnd[i][r]!=0) {
							dnd[i][j]=dnd[i][r];
							dnd[i][r]=0;
						}
					}
				}
			}
			// return dnd;
			return sortZero(dnd,"right");
		}
	} else {
		return " sai rồi má";
	}
}
// function check condition stop assign zero
function check(arr,where) {
	if (where=="up") {
		for (var i=0; i<=l; i++) {
			for (var j=0; j<=l; j++) {
				if (j+1 <= l){
					if (arr[j][i]==0 && arr[j+1][i]!=0) {
						return false;
					}
				} else if (j+2 <= l){
					if (arr[j][i]==0 && arr[j+2][i]!=0) {
						return false;
					}
				} else if (j+3 <= l){
					if (arr[j][i]==0 && arr[j+3][i]!=0) {
						return false;
					}
				} else {
					if (i==l){
						return true;
					}
				}
			}

		}
		
	} else if (where=="down") {
		for (var i = l; i>=0; i--) {
			for (var j = l; j>=0; j--) {
				// console.log(1);
				if (j-1 >=0){
					if (arr[j][i]==0 && arr[j-1][i]!=0) {
						return false;
					}
				} else if (j-2 >=0){
					if (arr[j][i]==0 && arr[j-2][i]!=0) {
						return false;
					}
				} else if (j-3>=0){
					if (arr[j][i]==0 && arr[j-3][i]!=0) {
						return false;
					}
				} else {
					if (i==0){
						return true;
					}
				}
			}

		}
	} else if (where == "left") {
		for (var i=0; i<=l; i++) {
			for (var j=0; j<=l; j++) {
				if (j+1 <= l){
					if (arr[i][j]==0 && arr[i][j+1]!=0) {
						return false;
					}
				} else if (j+2 <= l){
					if (arr[i][j]==0 && arr[i][j+2]!=0) {
						return false;
					}
				} else if (j+3 <= l){
					if (arr[i][j]==0 && arr[i][j+3]!=0) {
						return false;
					}
				} else {
					if (i==l){
						return true;
					}
				}
			}

		}
	} else if (where == "right") {
		for (var i = l; i>=0; i--) {
			for (var j = l; j>=0; j--) {
				// console.log(1);
				if (j-1 >=0){
					if (arr[i][j]==0 && arr[i][j-1]!=0) {
						return false;
					}
				} else if (j-2 >=0){
					if (arr[i][j]==0 && arr[i][j-2]!=0) {

						return false;
					}
				} else if (j-3>=0){
					if (arr[i][j]==0 && arr[i][j-3]!=0) {
						return false;
					}
				} else {
					if (i==0){
						return true;
					}
				}
			}

		}
	} else {
		return " sai rồi má";
	}
}
// insert value in view
function inset(dnd) {

	for (var i=l; i>= 0; i--) {
    	for (var j=l; j>=0; j--) {
    		var value = 0;
    		if (dnd[i][j] == 0) {
    			 value = null;
    		} else {
    			value = dnd[i][j];
    		}
	     	$("#"+i+j).val(value);
	     	if (value<4) {
	     		$("#"+i+j).css("background-color","#e1b9a9");
	     	}else if(value==4) {
	     		$("#"+i+j).css("background-color","#e19799");
	     	}else if(value==8) {
	     		$("#"+i+j).css("background-color","#f2b679");
	     	} else if(value==16) {
	     		$("#"+i+j).css("background-color","#f2b178");
	     	}else if(value==32) {
	     		$("#"+i+j).css("background-color","#f2b166");
	     	}else if(value==64) {
	     		$("#"+i+j).css("background-color","#f2b155");
	     	} else if(value==128 ) {
	     		$("#"+i+j).css("background-color","#f2b144");
	     	} else if(value==256) {
	     		$("#"+i+j).css("background-color","#f2b133");
	     	} else if(value==512) {
	     		$("#"+i+j).css("background-color","#f2b122");
	     	}else if(value==1024) {
	     		$("#"+i+j).css("background-color","#f2b111");
	     	}else if(value==2048) {
	     		$("#"+i+j).css("background-color","#f2b100");
	     	}
	    }
    }
}
//  find poision há value = 0
function findZero(dnd) {
	var emp = [];
	for (var i=l; i>= 0; i--) {
    	for (var j=l; j>=0; j--) {
    		if (dnd[i][j] == 0) {
				emp.push([i,j]);
			}
	    }
    }
    return emp;
}
// make random value
function ranDom(dnd,emp){
	var lengEmp = emp.length;

	if (lengEmp == 0) {
		dndCheck = 1;
		return dnd;
	} else if (lengEmp>=1) {
		var x = Math.floor((Math.random() * lengEmp) );
		var y = Math.floor((Math.random() * lengEmp) );
		if (x==y || lengEmp==1){
			var i= emp[x][0];
			var j= emp[x][1];
			dnd[i][j]=2;
			return dnd;

		} else {
			var i1= emp[x][0];
			var j1= emp[x][1];

			var i2= emp[y][0];
			var j2= emp[y][1];

			dnd[i1][j1]=2;
			// return 1;
			dnd[i2][j2]=2;
			return dnd;


		}
	}
}
//  function chẹk fail
function checkFail(dnd) {
	var fail= 0;

	for (var i=0; i<=l; i++) {
		for (var j=0; j<=l; j++) {
			var jc = j+1;
			var ic = i+1;
			if (jc<=l && ic<=l){
				if (dnd[i][j]!=0 && dnd[i][jc]!=0 && dnd[ic][j]!=0){
					if (dnd[i][j] != dnd[i][jc] && dnd[i][j] != dnd[ic][j]) {
						fail++;
				// console.log(fail);
					} else{
							fail--;
						}
					}
				// console.log(11);
			} else if (jc == 4 && ic<=3) {
				if (dnd[i][j] != dnd[ic][j]) {
						fail++;
					}else{
							fail--;
						}
			} else if (ic == 4 && jc<=3) {
				if (dnd[i][j] != dnd[i][jc]) {
						fail++;
					}else{
							fail--;
						}
			}
		}
	}
	console.log(fail);
// check fail if fail
	if (fail==15){
		$("#fail").show('slow');
		$("#fail").animate({height: "300px"});
		$( "#table" ).toggle( "bounce", { times: 3 }, "slow" );
		$("#table").animate({backgroundColor: "#000"}, 1000);
		$("body").animate({ backgroundColor: "#000000" }, 1000);
	 	$("#next").click(function(){
	 		 location.reload();
	 	})
	} else { // if not
		return dnd;
	}

}

function bd(duc) {
	var duoc = ranDom(duc,findZero(duc));
	inset(duoc);	
	return duoc;
}
// -------------------------------------------------------------------------------------------------------------------
var duc = bd(begin1);

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        checkFail(duc);
        var result = sortZero(duc,"left");
	    result = move(result,"left");
		result = sortZero(result,"left");
	    result = ranDom(result,findZero(result));
		inset(result);
        break;

        case 38: // up
        checkFail(duc);
        var result = sortZero(duc,"up");
	    result = move(result,"up");
		result = sortZero(result,"up");
	    result = ranDom(result,findZero(result));
		inset(result);
        break;

        case 39: // right
        checkFail(duc);
        var result = sortZero(duc,"right");
	    result = move(result,"right");
		result = sortZero(result,"right");
	    result = ranDom(result,findZero(result));
		inset(result);
        break;

        case 40: // down
        checkFail(duc);
        var result = sortZero(duc,"down");
	    result = move(result,"down");
		result = sortZero(result,"down");
	    result = ranDom(result,findZero(result));
		inset(result);
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

});
