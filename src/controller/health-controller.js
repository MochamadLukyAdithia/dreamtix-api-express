const ping = async (req, res, next) => {
    try {
        res.send('Server sedang berfungsi dengan baik');
    } catch (e) {
        next(e);
    }
}

export default {
    ping
}
