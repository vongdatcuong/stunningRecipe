

const home = async (req, res) => {
	res.render('index', {
		title: 'Stunning Recipe',
		user: {}
	});
};

const history = (req, res) => {
	res.render('history', {
		title: 'Lịch sử',
	});
};

const search = (req, res) => {
	res.render('search', {
		title: 'Tìm kiếm',
	});
};

const changePwd = (req, res) => {
	res.render('changePwd', {
		title: 'Thay đổi mật khảu',
	});
};

const contact = (req, res) => {
	res.render('contact', {
		title: 'Liên hệ',
	});
};

const about = (req, res) => {
	res.render('about', {
		title: 'About Us',
	});
};

const privacy = (req, res) => {
	res.render('privacy', {
		title: 'Riêng tư',
	});
};

const terms = (req, res) => {
	res.render('terms', {
		title: 'Chính sách',
	});
};

const help = (req, res) => {
	res.render('help', {
		title: 'Hỗ trợ',
	});
};

const faqs = (req, res) => {
	res.render('faqs', {
		title: 'FAQS',
	});
};

module.exports = {
	home,
	history,
	contact,
	about,
	privacy,
	terms,
	help,
	faqs,
};
