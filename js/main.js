$(document).ready(function () {
	// Add Expense Event//
	$('#add-expense-form').on('submit', function(e){
		addExpense(e);
	});
	
	// Edit Expenses
	$('#edit-expense-form').on('submit', function(e){
		updateExpense(e);
	});
	
	// Remove Expenses Event
	$('#expense-table').on('click', '#remove-expense', function(){
		id = $(this).data('id');
		removeExpense(id);
		
	});
	
	// Clear Expenses Event
	$('#clear-expenses').on('click', function(){
		clearAllExpenses();
	});
	
	displayExpenses();
	
	function displayExpenses(){
		var expenseList = JSON.parse(localStorage.getItem('expenses'));
		
		//Sort Expenses
		if (expenseList !== null) {
			expenseList.sort(function(a,b){return new Date(a.date) - new Date(b.date);});
		}

		//Set Counter
		var i = 0;
		var expenseTotal = 0;
		if(localStorage.getItem('expenses') !== null){
			$.each(expenseList, function(key,value){
				expenseTotal += parseFloat(value.amount);
				$('#expense-table').append('<tr id="'+ value.id + '">'+
										   '<td>' + ++i + '</td>'+
										   '<td>' + value.date + '</td>'+
										   '<td>' + value.expense + '</td>'+
										   '<td>' + value.amount + '</td>'+
										   '<td><a href="edit.html?id=' + value.id +'">Edit</a> |  <a href="#" id="remove-expense" data-id="'+ value.id+'">Remove</a></td>' + '</tr>');
			});
			$('#expense-table tfoot').html('<tr>' + 
											'<td></td>' + 
											'<td><strong>Total:</strong></td>' +
											'<td></td>' +
											'<td><strong>' + expenseTotal + '</strong></td>' +
											'<th></th>' + '</tr>');
		}
	}

	// Function to add new expense
	function addExpense(e){
		var newDate = new Date();
		var id = newDate.getTime();

		var expense = $('#expense').val();
		var amount = $('#amount').val();
		var date = $('#date').val();

		/* Simple Validation*/
		if(expense == ''){
			alert('Expense is required');
			e.preventDefault();
		}else if(amount == '') {
			alert('Amount is required');
			e.preventDefault();
		}else if(date == '') {
			alert('Date is required');
			e.preventDefault();
		}else {
			expenses = JSON.parse(localStorage.getItem('expenses'));
			
			//Check Expenses
			if(expenses == null){
				expenses = [];
			}
			
			var expenseList = JSON.parse(localStorage.getItem('expenses'));
			// New Expense Object
			var new_expense = {
				'id': id,
				'expense': expense,
				'amount': amount,
				'date': date
			};
			
			expenses.push(new_expense);
			localStorage.setItem('expenses', JSON.stringify(expenses));
			
			console.log('Expense Added');
		}

	}
	
	// function to update an expense
	function updateExpense(e) {
		var id = $('#expense_id').val();
		var expense = $('#expense').val();
		var amount = $('#amount').val();
		var date = $('#date').val();

		expenseList = JSON.parse(localStorage.getItem('expenses'));

		for(var j = 0; j < expenseList.length; j++){
			if(expenseList[j].id == id){
				expenseList.splice(j,1);
			}
			localStorage.setItem('expenses',JSON.stringify(expenseList));
		}
		
		/* Simple Validation*/
		if(expense == ''){
			alert('Expense is required');
			e.preventDefault();
		}else if(amount == '') {
			alert('Amount is required');
			e.preventDefault();
		}else if(date == '') {
			alert('Date is required');
			e.preventDefault();
		}else {
			expenses = JSON.parse(localStorage.getItem('expenses'));
			
			//Check Expenses
			if(expenses == null){
				expenses = [];
			}
			
			var expenseList = JSON.parse(localStorage.getItem('expenses'));
			// New Expense Object
			var new_expense = {
				'id': id,
				'expense': expense,
				'amount': amount,
				'date': date
			}
			
			expenses.push(new_expense);
			localStorage.setItem('expenses', JSON.stringify(expenses));
		}
	}
	
	// Function to remove expense
	function removeExpense(id){
		if(confirm('Are you sure you want to delete this task?')){
			var expenseList = JSON.parse(localStorage.getItem('expenses'));
			
			for(var i=0; i < expenseList.length; i++){
				if(expenseList[i].id == id){
					expenseList.splice(i,1)
				}
				localStorage.setItem('expenses', JSON.stringify(expenseList));
			}
			location.reload();
		}
	}
	
	// Function to clear all expenses
	function clearAllExpenses(){
		if(confirm('Do you want to clear all expenses?')){
			localStorage.clear();
			location.reload();
		}
	}

});

// Function for getting single expense
function getExpense(){
	var $_GET = getQueryParams(document.location.search);
	id = $_GET['id'];
	
	var expenseList = JSON.parse(localStorage.getItem('expenses'));
	for(var i=0; i < expenseList.length; i++){
		if(expenseList[i].id == id ){
			$('#edit-expense-form #expense_id').val(expenseList[i].id);
			$('#edit-expense-form #expense').val(expenseList[i].expense);
			$('#edit-expense-form #amount').val(expenseList[i].amount);
			$('#edit-expense-form #date').val(expenseList[i].date);
		}
	}
}

// Function to get HTTP GET Requests
function getQueryParams(qs) {
	qs = qs.split('+').join(" ");
	var params = {},
		tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;
	while(tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}
	
	return params;
}