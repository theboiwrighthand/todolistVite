import Cookies from 'js-cookie'

const token = Cookies.get("jwt") // lấy token mà lúc đăng nhập đã lưu vào cookies
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
export default config