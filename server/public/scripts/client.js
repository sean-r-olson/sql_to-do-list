console.log('IN JS');

$(document).ready(onReady);

function onReady () {
    //update DOM with 
    getTasks();
    $('#addTaskBtn').on('click', addTask);
    $('#taskListDiv').on('click', '.completeBtn', completeTask);
    $('#taskListDiv' ).on( 'click', '.deleteBtn', deleteTask );
}

//Setup GET request 
//get data from server
//loop through array
//append data - add class for completed tasks
function getTasks () {
    console.log('in getTasks');
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response){
        let el = $('#taskListDiv');
        el.empty();
        for (let i=0; i<response.length; i++) {
            if (response[i].status === true) {
            el.append( `
            <tr>
            <td style="width: 50%" class="completeTask">${response[i].tasks}</td>      
            <td style="width: 25%" ><button class="completeTaskBtn" disabled="disabled" data-status="${response[i].status}" class="completeBtn" data-id="${response[i].id}">TASK COMPLETE</button></td>
            <td style="width: 25%"><button class="deleteBtn" data-id="${response[i].id}">delete task</button></td>
            </tr>
            `)
        } else {
            el.append( `
            <tr>
            <td style="width: 50%">${response[i].tasks}</td>
            <td style="width: 25%"><button data-status="${response[i].status}" class="completeBtn" data-id="${response[i].id}">complete task</button></td>
            <td style="width: 25%"><button class="deleteBtn" data-id="${response[i].id}">delete task</button></td>
            </tr>
            `
            )
        } 
        }
    // end for 
    }).catch(function(err){
        alert('error getting tasks:', err);
    })
}

//Setup POST request
//add newly submitted data to DOM
//send new object based on user inputs to server 
//refresh DOM by running GET in .then 
function addTask (event) {
    event.preventDefault();
    console.log('in addTask');
    let objectToSend = {
        tasks: $('#addTaskIn').val()
    }
    $('#addTaskIn').val('');
    console.log('in addTask', objectToSend);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then(function (response){
        console.log('back from POST with:', response);
        getTasks();
    }).catch(function(err){
        alert('error adding task:', err)
    })
}

//Setup PUT request
//update status to 'true' for completed task
//update DOM by running GET in .then
function completeTask (event) {
    event.preventDefault();
    console.log('in completeTask');
    const id = $(this).data('id');
    const status = $(this).data('status');
    console.log(status);
    console.log('in completeTask', id, status);
    $.ajax({
        type: 'PUT',
        url: `tasks/${id}`,
        data: {newStatus: !status}
    }).then(function(response){
        console.log('back from PUT with:', response);
        getTasks();
    }).catch(function(err){
        console.log('error UPDATING:', err);
    })
}

//setup DELETE request:
//remove a task (row) from DOM 
//update DOM by running GET in .then
function deleteTask(event){
    event.preventDefault();
    const id = $( this ).data( 'id' );
    console.log( 'in deleteTask:', id );
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${ id }`
    }).then( function( response ){
        console.log( 'back from DELETE:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'Error with Delete:', err );
    })
}

