$(function () {
    // Display the current date at the header of the page.
    $("#currentDay").text(dayjs().format('MMMM D, YYYY'));

    // Save user input to local storage when the save button is clicked.
    $(".saveBtn").on("click", function() {
        const hourKey = $(this).parent().attr("id");
        const eventText = $(this).siblings(".description").val();
        localStorage.setItem(hourKey, eventText);
    });

    // Update the color of each time block based on current time.
    function updateTimeBlockColors() {
        const currentHour = dayjs().hour();
        $(".time-block").each(function () {
            const blockHour = parseInt($(this).attr("id").split("-")[1]);
            if (blockHour < currentHour) {
                $(this).addClass("past").removeClass("present future");
            } else if (blockHour === currentHour) {
                $(this).addClass("present").removeClass("past future");
            } else {
                $(this).addClass("future").removeClass("past present");
            }
        });
    }

    updateTimeBlockColors();
    setInterval(updateTimeBlockColors, 600000);

    // Retrieve saved user input from local storage and populate the time blocks.
    $(".time-block").each(function () {
        const hour = $(this).attr("id");
        const eventText = localStorage.getItem(hour);
        if (eventText) {
            $(this).children(".description").val(eventText);
        }
    });
});

