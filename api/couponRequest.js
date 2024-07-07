import requestWrapper from "@/api/requestWrapper";

export const applyCouponRequest = ({couponCode})=>{
    return requestWrapper({
        url: 'apply-coupon/',
        method: 'POST',
        data: {
            code: couponCode
        }
    });
}