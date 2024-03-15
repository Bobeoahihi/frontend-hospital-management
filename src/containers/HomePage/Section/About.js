import React, { Component } from 'react';
import { connect } from 'react-redux';
class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông trang web
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="500px"
                            src="https://www.youtube.com/embed/0EmcQx_Y8nw"
                            title="Thông điệp 2K+ phòng chống dịch COVID-19| Kênh thông tin Bộ Y tế"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>

                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Thông điệp 2K (KHẨU TRANG - KHỬ KHUẨN) + VẮC XIN + THUỐC + ĐIỀU TRỊ + CÔNG NGHỆ + Ý THỨC NGƯỜI DÂN và các biện pháp khác để phòng, chống dịch COVID-19 trong tình hình mới
                            (Ban hành kèm theo Kế hoạch số 1176 /KH-BYT ngày 07 tháng 9 năm 2022)</p>
                        <p>- KHẨU TRANG: Khuyến khích đeo khẩu trang khi đến nơi công cộng. Bắt buộc đeo khẩu trang đối với:
                            + Người có biểu hiện bệnh viêm đường hô hấp cấp, người mắc hoặc nghi ngờ mắc COVID-19;
                            +Các  đối tượng (trừ trẻ em dưới 5 tuổi) khi đến nơi công cộng thuộc khu vực được công bố cấp độ dịch ở mức độ 3 hoặc mức độ 4 theo Quyết định số 218/QĐ-BYT ngày 27/01/2022 Hướng dẫn tạm thời về chuyên môn y tế thực hiện Nghị quyết số 128/NQ-CP ngày 11/10/2021;
                            + Và áp dụng cụ thể với một số địa điểm và đối tượng theo Quyết định số 2447/QĐ-BYT ngày 06/9/2022 của Bộ Y tế.
                            (Hướng dẫn chi tiết theo Quyết định số 2447/QĐ-BYT ngày 06/9/2022 của Bộ Y tế)
                            - KHỬ KHUẨN: thường xuyên rửa tay bằng xà phòng và nước sạch hoặc dung dịch sát khuẩn tay nhanh; vệ sinh cá nhân sạch sẽ; vệ sinh môi trường nơi ở, nơi làm việc, học tập.
                            (Hướng dẫn chi tiết theo Khuyến cáo của cơ quan y tế)
                            - VẮC XIN: thực hiện tiêm phòng COVID-19 đầy đủ và đúng lịch theo hướng dẫn của Bộ Y tế.
                            - Vẫn cần tiếp tục thực hiện các biện pháp về THUỐC + ĐIỀU TRỊ + CÔNG NGHỆ + Ý THỨC NGƯỜI DÂN và các biện pháp khác:
                            + Sử dụng thuốc theo hướng dẫn của cơ quan y tế.
                            + Tuân thủ các hướng dẫn chẩn đoán, điều trị COVID-19 và khám bệnh khi có các dấu hiệu bất thường sau mắc COVID-19.
                            + Sử dụng các ứng dụng công nghệ theo hướng dẫn của cơ quan chức năng nhằm kiểm soát tốt tình hình dịch bệnh.
                            + Ý thức người dân: chủ động thực hiện các biện pháp phòng bệnh, không phát tán tuyên truyền thông tin xấu – độc, tham gia và tuân thủ các quy định về hoạt động phòng, chống dịch của cơ quan chức năng.
                            + Các biện pháp khác: theo hướng dẫn của cơ quan y tế hoặc cơ quan có thẩm quyền tại trung ương và địa phương.</p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
