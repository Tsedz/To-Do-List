// Step 1: Add a new task
//Adding a new task
$("#addTaskBtn").click(function (){
    const inpt = $("#taskInput").val().trim()

    if (inpt !== '') {
        $("#taskList").append(`
            <li class='list'>
                <div class='listDiv'>
                    <span class="newTask active">${inpt}</span>
                    <button class="addButton">Add More</button>
                    <button class="delButton">Delete</button>
                </div>
                <ul class='sub-list'></ul>
            </li>
        `)
    }
    $("#taskInput").val("")
});

// Step 2: Mark task as done
//Adding the completed css
$("#taskList").on("click", ".newTask", function () {
    $(this).toggleClass("completed active");
});


// Hover effect: highlight task on mouse enter/leave
$("#taskList").on("mouseenter",".newTask", function () {
    $(this).css('background-color', '#F0F2BD');
})
$('#taskList').on('mouseleave','.newTask', function () {
    $(this).css('background-color','');
})

// Step 3: Delete task
//Deleting a task from the list
$('#taskList').on('click','.delButton', function () {
    $(this).closest('li').remove()
});

//Adding a sub list
$('#taskList').on('click','.addButton', function () {
    const lit = $(this).closest('li');

    if(lit.find('.subInput').length === 0 ) {
        lit.find('.sub-list').before(`
            <div class='divSubInput'>
                <input type='text' class='subInput' placeholder="Add a sub list here...">
                <button class='saveBtn'>Save</button>
            </div>
        `)
    }
});
//Saving the sub list
$('#taskList').on('click','.saveBtn', function () {
    const subinpt = $(this).closest('li').find('.subInput').val().trim()
    if (subinpt !== '') {
        $(this).closest('li').find('.sub-list').append(`
            <li class = 'subItem'>
                <span class='subText'>${subinpt}</span>
                <button class='subDelBtn'>Delete</button>
            </li>
        `)
        $(this).closest('.divSubInput').remove()

    }
});
//Deletes the sub list
$('#taskList').on('click','.subDelBtn', function () {
    $(this).closest('li').remove()
});
//Hover effect on sub list
$('#taskList').on('mouseenter','.subText',function () {
    $(this).css('background-color','#f0f0f0')
});
$('#taskList').on('mouseleave','.subText', function () {
    $(this).css('background-color','')
});
//Mark sub input as done
$('#taskList').on('click','.subText', function () {
    $(this).toggleClass('completed')

});


// Step 4: Add task with Enter key
//Including the enter key to the main list
$('#taskInput').keypress(function (event) {
    if (event.which === 13) {
        $('#addTaskBtn').click()
    }
});
//Adding the enter key to the sublist
$('#taskList').on('keypress','.subInput', function (event) {
    if (event.which === 13) {
        $(this).siblings('.saveBtn').click()
    }
});

// Step 5: Add filters (optional)
//Filtering the main tasks
$('#filters').on('click', '.filterBtn', function () {
    const filterType = $(this).data('filter');

    $('.filterBtn').removeClass('active');
    $(this).addClass('active');

    $('#taskList li').each(function () {
        const taskSpan = $(this).find('.newTask');

        if (filterType === 'all') {
            $(this).show();
        } else if (filterType === 'active') {
            taskSpan.hasClass('active') ? $(this).show() : $(this).hide();
        } else if (filterType === 'completed') {
            taskSpan.hasClass('completed') ? $(this).show() : $(this).hide();
        }
    });
});



// Step 6: Local storage (optional advanced)
