import ProductSalesTrafficPage from "@/component/report/product/ProductSalesTraffic";
import RevenueAndVisits from "@/component/report/product/RevenueAndVisits";
import React from "react";

export default function ProductSalesTraffic() {
    //   - Trung tâm phát triển: 
    // 		+ Hiệu quả kinh doanh: Filter (Hôm nay, hôm qua, 7 ngày, 30 ngày, tùy chọn), Chỉ số chính (Doanh số, đơn hàng, doanh thu thuần, Lượt xem, Tỉ lệ chuyển đổi, Giá 		trị đơn hàng trung bình, Đơn hàng hủy), Top 10 sản phẩm, Top 10 thành phố.
    // 		+ Chỉ số sản phẩm:
    // 		+ Chỉ số khuyến mãi: 
    // 		+ Hiệu quả vận hành:

    const props =
    {
        label: 'Doanh thu & lượt truy cập',
        value: 'RevenueAndVisits',
        url: '/report/product-sales-traffic',
        children: <RevenueAndVisits/>
    }

    return (
        <React.Fragment>
            <ProductSalesTrafficPage pageProps={props} />
        </React.Fragment>
    );
}