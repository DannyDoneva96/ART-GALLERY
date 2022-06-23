const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAll, sharePubl, getUsersPubl, findUsersShared } = require('../services/publications');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const publications = await getAll();
    publications.map(p => p.count = p.shared.length);
    res.render('home', { title: 'Home Page', publications });
});

router.get('/catalog', async (req, res) => {
    const publications = await getAll();
    res.render('catalog', { title: 'Gallery Page', publications });
});

router.get('/catalog/:id', preload(), (req, res) => {
    const publication = res.locals.data;

    if (req.session.user) {
        publication.hasUser = true;
        publication.isOwner = req.session.user?._id == publication.owner._id;

        if (publication.shared.some(u => u._id == req.session.user._id)) {
            publication.isJoined = true;
        }
    }

    res.render('details', { title: 'Details Page', data: publication });
});


router.get('/share/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await sharePubl(id, req.session.user._id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect('/catalog/' + id);
    }

});

router.get('/profile', isUser(), async (req, res) => {
    const userPubls = await getUsersPubl(res.locals.user._id);
    res.locals.user.userPubls = userPubls;

    const userShared = await findUsersShared(res.locals.user._id);
    res.locals.user.userShared = userShared;

    res.render('profile', { title: 'Profile Page' });
});

module.exports = router;