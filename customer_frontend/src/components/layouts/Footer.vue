<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h3>Thông Tin</h3>
                    <div><span><i class="fas fa-envelope"></i> Liên Hệ</span></div>
                    <div><span><i class="fas fa-shipping-fast"></i> Thông Tin Vận Chuyển</span></div>
                    <div><span><i class="fas fa-user-secret"></i> Chính Sách Riêng Tư</span></div>

                </div>

                <div class="col-md-4">
                    <h3>Thông Tin Bổ Sung</h3>
                    <div><span><i class="fas fa-map-marked-alt"></i> Bản Đồ</span></div>
                    <div><span><i class="fas fa-user-circle"></i> Tài Khoản</span></div>

                </div>

                <div class="col-md-4">
                    <h3>Liên Hệ</h3>
                    <div><span><i class="fas fa-map-marker-alt"></i> Địa chỉ: Tam Binh, Vĩnh Long</span></div>
                    <div><span><i class="fas fa-phone"></i> Điện thoại: 0123456789</span></div>
                    <div><span><i class="fas fa-envelope"></i> Email: 1234@gmail.com</span></div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; B1910157</p>
            </div>
        </div>
    </footer>
</template>
  
<style>
footer {
    background-color: #9e5f17;
    color: #fff;
    padding: 50px 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.col-md-4 {
    width: 100%;
    max-width: 300px;
    margin-bottom: 30px;
}

footer h3 {
    font-size: 18px;
    margin-bottom: 20px;
}

footer span {
    display: block;
    margin-bottom: 10px;
}

footer span i {
    margin-right: 10px;
}

footer p {
    font-size: 14px;
    margin: 0;
}

.footer-bottom {
    background-color: #9e5f17;
    padding: 20px 0;
    text-align: center;
    position: relative;
}

.footer-bottom:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: #fff;
    opacity: 0.4;
}
</style>