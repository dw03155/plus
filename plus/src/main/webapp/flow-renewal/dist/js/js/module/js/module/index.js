(async () => {
    window.AlarmHistory = (await import("./components/alarm-history/")).default;
    window.InvitationPopup = (await import("./components/invitation-popup/")).default;
})()
