document.addEventListener('DOMContentLoaded', function() {
    function display(visible) {
        const mainFrame = document.querySelector('.speedometer');
        mainFrame.style.display = visible ? 'flex' : 'none';
    }

    $(function() {
        window.addEventListener('message', function(event) {
            const data = event.data;

            if (data.action === "show") {
                display(true);
                if (data.data.Speed !== undefined && data.data.rpm !== undefined) {
                    $('.speed').text(Math.floor(data.data.Speed));
                    const bars = $('.speedometer .bars div');
                    const rpmValue = data.data.rpm;

                    if (data.data.SpeedUnit === 'mph') {
                        $('.unit').text(data.data.SpeedUnit);
                    } else {
                        $('.unit').text(data.data.SpeedUnit);
                    }

                    bars.each(function(index, bar) {
                        if (index < Math.floor(rpmValue * bars.length)) {
                            if (index >= bars.length - 3) {
                                $(bar).css('background-color', '#f70303');
                            } else if (index >= bars.length - 6) {
                                $(bar).css('background-color', '#FFA500');
                            } else {
                                $(bar).css('background-color', '#03F7B9');
                            }
                        } else {
                            $(bar).css('background-color', '#6A6A6A5b');
                        }
                    });

                    const fuelLevel = data.data.Fuel;
                    const progressBar = $('.progress-bar');
                    progressBar.width(`${fuelLevel}%`);
                    if (fuelLevel > 50) {
                        progressBar.css('background-color', '#03F7B9');
                    } else if (fuelLevel > 25) {
                        progressBar.css('background-color', '#FFA500');
                    } else {
                        progressBar.css('background-color', '#f70303');
                    }

                }
            } else if (data.action === "hide") {
                display(false);
            }
        });
    });
});
