document.onkeydown = function (e) {
    function kCurrent() { return 1 }
    function kForward() { return 2 }
    function kBackward() { return 3 }

    function input(text, direction) {
        // UI 変わったらこの辺を適宜修正
        if (document.activeElement == null) return
        if (document.activeElement.nodeName.toLowerCase() != 'textarea') return
        function inputText(text) {
            document.activeElement.value = text
        }

        var now = new Date()
        switch (direction) {
            case kCurrent():
                break
            case kForward():
                now.setMinutes(now.getMinutes() + 14)
                now.setMinutes(Math.floor(now.getMinutes() / 15) * 15)
                break
            case kBackward():
                now.setMinutes(Math.floor(now.getMinutes() / 15) * 15)
                break
        }

        var hourText = ('00' + now.getHours()).slice(-2)
        var minuteText = ('00' + now.getMinutes()).slice(-2)
        inputText(text.replace('%TIME%', hourText + ':' + minuteText))
    }
    var direction = kCurrent()
    if (e.shiftKey && !e.ctrlKey) direction = kForward()
    if (!e.shiftKey && e.ctrlKey) direction = kBackward()
    if (e.altKey && e.code == 'Digit1') input('業務開始 %TIME%', direction)
    if (e.altKey && e.code == 'Digit2') input('休憩開始 %TIME%', direction)
    if (e.altKey && e.code == 'Digit3') input('休憩終了 %TIME%', direction)
    if (e.altKey && e.code == 'Digit4') input('業務終了 %TIME%', direction)
}
