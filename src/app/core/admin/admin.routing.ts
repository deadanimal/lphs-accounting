import { Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management/management.component';
import { ReportComponent } from './report/report.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PengurusanStorComponent } from './pengurusan-stor/pengurusan-stor.component';
import { PenggajianComponent } from './penggajian/penggajian.component';
import { KawalanBajetComponent } from './kawalan-bajet/kawalan-bajet.component';
import { AkaunBelumBayarComponent } from './akaun-belum-bayar/akaun-belum-bayar.component';
import { EClaimComponent } from './e-claim/e-claim.component';
import { PengekosanProjekComponent } from './pengekosan-projek/pengekosan-projek.component';
import { PembelianComponent } from './pembelian/pembelian.component';
import { PinjamanComponent } from './pinjaman/pinjaman.component';
import { PinjamanKakitanganComponent } from './pinjaman-kakitangan/pinjaman-kakitangan.component';
import { BajetOnlineComponent } from './bajet-online/bajet-online.component';
import { TuntutanComponent } from './tuntutan/tuntutan.component';
import { TerimaanComponent } from './terimaan/terimaan.component';
import { PelaburanComponent } from './pelaburan/pelaburan.component';
import { BukuTunaiComponent } from './buku-tunai/buku-tunai.component';
import { LejarAmComponent } from './lejar-am/lejar-am.component';
import { PerakaunanAsetComponent } from './perakaunan-aset/perakaunan-aset.component';
import { PengurusanAsetComponent } from './pengurusan-aset/pengurusan-aset.component';
import { AkaunBelumTerimaComponent } from './akaun-belum-terima/akaun-belum-terima.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'analytics',
                component: AnalyticsComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'management',
                component: ManagementComponent
            },
            {
                path: 'report',
                component: ReportComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'penggajian',
                component: PenggajianComponent
            },
            {
                path: 'pengurusan-stor',
                component: PengurusanStorComponent
            },
            {
                path: 'kawalan-bajet',
                component: KawalanBajetComponent
            },
            {
                path: 'akaun-belum-bayar',
                component: AkaunBelumBayarComponent
            },
            {
                path: 'e-claim',
                component: EClaimComponent
            },
            {
                path: 'pengekosan-projek',
                component: PengekosanProjekComponent
            },
            {
                path: 'pembelian',
                component: PembelianComponent
            },
            {
                path: 'pinjaman',
                component: PinjamanComponent
            },
            {
                path: 'pinjaman-kakitangan',
                component: PinjamanKakitanganComponent
            },
            {
                path: 'bajet-online',
                component: BajetOnlineComponent
            },
            {
                path: 'terimaan',
                component: TerimaanComponent
            },
            {
                path: 'tuntutan',
                component: TuntutanComponent
            },
            {
                path: 'pelaburan',
                component: PelaburanComponent
            },
            {
                path: 'buku-tunai',
                component: BukuTunaiComponent
            },
            {
                path: 'lejar-am',
                component: LejarAmComponent
            },
            {
                path: 'perakaunan-aset',
                component: PerakaunanAsetComponent
            },
            {
                path: 'pengurusan-aset',
                component: PengurusanAsetComponent
            },
            {
                path: 'akaun-belum-terima',
                component: AkaunBelumTerimaComponent
            }
        ]
    }
]