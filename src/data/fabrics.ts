export interface Fabric {
  id: string;
  name: string;
  pricePerMeter: string;
  material: string;
  description: string;
  uses: string;
  image: string;
}

export const fabrics: Fabric[] = [
  {
    id: '1',
    name: 'Lụa Tơ Tằm',
    pricePerMeter: '200.000 - 350.000 đ/mét',
    material: 'Sợi tơ tằm tự nhiên 100%',
    description: 'Lụa tơ tằm là loại vải cao cấp được dệt từ sợi tơ tự nhiên, có độ bóng mượt tự nhiên, mềm mại và thoáng mát. Chất liệu thân thiện với da, có khả năng điều hòa nhiệt độ tốt.',
    uses: 'Áo dài, váy dạ hội, khăn lụa, đồ ngủ cao cấp, áo sơ mi, quần áo may mặc sang trọng',
    image: '/images/lua-to-tam.jpg'
  },
  {
    id: '2',
    name: 'Lụa Satin',
    pricePerMeter: '150.000 - 250.000 đ/mét',
    material: 'Polyester hoặc silk blend',
    description: 'Lụa satin có bề mặt bóng mượt một mặt, mặt kia hơi nhám. Vải mềm, rủ đẹp, giữ form tốt và có độ bền cao. Màu sắc rực rỡ, không bị phai.',
    uses: 'Váy cưới, áo dài, đầm dự tiệc, vải trang trí nội thất, chăn ga gối đệm cao cấp',
    image: '/images/lua-satin.jpg'
  },
  {
    id: '3',
    name: 'Vải Gấm',
    pricePerMeter: '300.000 - 500.000 đ/mét',
    material: 'Sợi tổng hợp kết hợp với kim tuyến',
    description: 'Vải gấm có hoa văn nổi, dệt thêm chỉ kim tuyến tạo độ sang trọng. Vải dày dặn, có trọng lượng, giữ form cực tốt và bền màu.',
    uses: 'Áo dài cưới hỏi, trang phục truyền thống, vest, áo khoác, túi xách cao cấp, trang trí nội thất',
    image: '/images/vai-gam.jpg'
  },
  {
    id: '4',
    name: 'Vải Kate',
    pricePerMeter: '80.000 - 150.000 đ/mét',
    material: 'Polyester 100%',
    description: 'Vải kate có bề mặt hơi nhám, độ dày vừa phải, ít nhăn và dễ giặt. Giá thành phải chăng nhưng vẫn đảm bảo chất lượng tốt cho may mặc hàng ngày.',
    uses: 'Áo sơ mi công sở, váy liền, quần tây, đồng phục học sinh, đồng phục công ty',
    image: '/images/vai-kate.jpg'
  },
  {
    id: '5',
    name: 'Vải Linen',
    pricePerMeter: '120.000 - 200.000 đ/mét',
    material: 'Sợi lanh tự nhiên hoặc cotton blend',
    description: 'Vải linen có kết cấu thô, thoáng mát và hút ẩm tốt. Đặc biệt phù hợp với thời tiết nóng ẩm, mang lại cảm giác mát mẻ và thoải mái.',
    uses: 'Quần áo mùa hè, áo sơ mi, váy, túi vải, khăn trải bàn, vải trang trí',
    image: '/images/vai-linen.jpg'
  },
  {
    id: '6',
    name: 'Vải Voan',
    pricePerMeter: '50.000 - 120.000 đ/mét',
    material: 'Polyester hoặc silk',
    description: 'Vải voan mỏng nhẹ, trong suốt hoặc bán trong suốt, có độ bóng nhẹ. Vải rất mềm mại và bay bổng, tạo cảm giác nhẹ nhàng, nữ tính.',
    uses: 'Váy maxi, áo kiểu, khăn choàng, rèm cửa, phụ kiện trang trí',
    image: '/images/vai-voan.jpg'
  },
  {
    id: '7',
    name: 'Vải Thun 4 Chiều',
    pricePerMeter: '60.000 - 150.000 đ/mét',
    material: 'Cotton blend với spandex/lycra',
    description: 'Vải thun co giãn 4 chiều, ôm body, thoải mái khi vận động. Có độ đàn hồi cao, thấm hút mồ hôi tốt và dễ giặt ủi.',
    uses: 'Áo thun, quần legging, váy body, đồ thể thao, đồ ngủ',
    image: '/images/vai-thun.jpg'
  },
  {
    id: '8',
    name: 'Vải Jean/Denim',
    pricePerMeter: '100.000 - 200.000 đ/mét',
    material: 'Cotton hoặc cotton blend',
    description: 'Vải jean dày dặn, bền chắc, có độ cứng cáp. Màu sắc đa dạng từ xanh denim truyền thống đến các màu hiện đại. Càng giặt càng mềm và ôm form đẹp.',
    uses: 'Quần jean, áo khoác jean, váy, túi xách, giày dép',
    image: '/images/vai-jean.jpg'
  }
];
