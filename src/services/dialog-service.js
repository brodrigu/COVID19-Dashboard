const confirm = (options) => {
    // eslint-disable-next-line no-alert
    const result = window.confirm(options.message);
    if (result) {
        // confirmed
        if (!options.onConfirm) return;
        options.onConfirm();
    } else {
        // cancelled
        if (!options.onCancel) return;
        options.onCancel();
    }
};

// eslint-disable-next-line no-alert
const alert = options => window.alert(options.message);

export default {
    alert,
    confirm,
};
