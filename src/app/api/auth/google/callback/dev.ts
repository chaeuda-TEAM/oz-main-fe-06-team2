// pages/api/auth/google/callback/dev.js

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { code } = req.query;
        console.log('Code:', code);

        // 받은 코드로 처리하는 로직을 추가

        res.status(200).json({ message: 'Success', code });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
