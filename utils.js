function toggleList(id) {
    // alert(JSON.stringify($(id).css("display")));
    if ($(id).css("display") != "none") {
        $(id).fadeOut();
    } else {
        $(id).fadeIn();
    }
}

function dragAndSave(id) {
    // mobile devices have trouble to drag.
    if (screen.width <= 800) return;

    // get positions in localStorage
    var positions = JSON.parse(localStorage.positions || "{}");

    // restore the positions of the saved elements
    $.each(positions, function (id, pos) {
        $(id).css(pos);
    });

    // save the position of the draggable element into localStorage
    $(id).draggable({
        containment: "#containment-wrapper",
        scroll: true,
        stop: function (event, ui) {
            positions[id] = ui.position;
            localStorage.positions = JSON.stringify(positions);
        },
    });

    // reset localStorage
    window.onkeydown = function (event) {
        if (event.metaKey && event.key === "Escape") {
            localStorage.clear();
            alert("Local storage has been cleared");
        } else if (event.key == "b") {
            window.location.href = "/cwdc";
        } else if (event.key == "B") {
            let path = window.location.pathname;
            window.location.href = path.split("/", 3).join("/");
        }
    };
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
