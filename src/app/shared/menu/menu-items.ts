export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-warning'
  },
  {
    path: '/admin/penggajian',
    title: 'Penggajian',
    type: 'link',
    icontype: 'fas fa-money-check text-purple'
  },
  {
    path: '/admin/pengurusan-stor',
    title: 'Pengurusan Stor',
    type: 'link',
    icontype: 'fas fa-window-restore text-blue'
  },
  {
    path: '/admin/e-claim',
    title: 'eClaim',
    type: 'link',
    icontype: '' //fas fa-comment-dollar text-pink
  },
  {
    path: '/admin/pengekosan-projek',
    title: 'Pengekosan Projek',
    type: 'link',
    icontype: '' //fas fa-search-dollar text-purple
  },
  {
    path: '/admin/pembelian',
    title: 'Pembelian',
    type: 'link',
    icontype: 'fas fa-receipt text-green'
  },
  {
    path: '/admin/pinjaman',
    title: 'Pinjaman/Pajakan',
    type: 'link',
    icontype: 'fas fa-coins text-yellow'
  },
  {
    path: '/admin/pinjaman-kakitangan',
    title: 'Pinjaman Kakitangan',
    type: 'link',
    icontype: 'fas fa-receipt text-orange'
  },
  {
    path: '/admin/bajet-online',
    title: 'Bajet Online',
    type: 'link',
    icontype: 'fas fa-comments-dollar text-indigo'
  },
  {
    path: '/admin/terimaan',
    title: 'Terimaan',
    type: 'link',
    icontype: ''
  },
  {
    path: '/admin/tuntutan',
    title: 'Tuntutan/Pendahuluan',
    type: 'link',
    icontype: ''
  },
  {
    path: '/admin/pelaburan',
    title: 'Pelaburan',
    type: 'link',
    icontype: 'fas fa-funnel-dollar text-yellow'
  },
  {
    path: '/admin/buku-tunai',
    title: 'Buku Tunai',
    type: 'link',
    icontype: 'fas fa-money-check text-green'
  },
  {
    path: '/admin/lejar-am',
    title: 'Lejar Am',
    type: 'link',
    icontype: ''
  },
  {
    path: '/admin/perakaunan-aset',
    title: 'Perakaunan Aset',
    type: 'link',
    icontype: 'fas fa-align-justify text-pink'
  },
  {
    path: '/admin/pengurusan-aset',
    title: 'Pengurusan Aset',
    type: 'link',
    icontype: 'fas fa-boxes text-green'
  },
  {
    path: '/admin/akaun-belum-terima',
    title: 'Akaun Belum Terima',
    type: 'link',
    icontype: 'fas fa-file-invoice-dollar text-dark'
  },
  {
    path: '/admin/akaun-belum-bayar',
    title: 'Akaun Belum Bayar',
    type: 'link',
    icontype: 'fas fa-file-invoice text-red'
  },
  {
    path: '/admin/kawalan-bajet',
    title: 'Kawalan Bajet',
    type: 'link',
    icontype: 'fas fa-calculator text-blue'
  },
  {
    path: '/admin/management',
    title: 'Pengurusan',
    type: 'link',
    icontype: 'fas fa-cogs text-purple'
  },
  {
    path: '/admin/report',
    title: 'Laporan',
    type: 'link',
    icontype: 'far fa-file-alt text-yellow'
  },
  {
    path: '/admin/analytics',
    title: 'Analitik',
    type: 'link',
    icontype: 'far fa-chart-bar text-blue'
  },
  {
    path: '/admin/profile',
    title: 'Profil',
    type: 'link',
    icontype: 'far fa-id-badge text-red'
  },
  {
    path: '/admin/settings',
    title: 'Tetapan',
    type: 'link',
    icontype: 'fas fa-sliders-h text-orange'
  }
];

/*
{
  path: '',
  title: '',
  type: 'link',
  icontype: ''
}
*/