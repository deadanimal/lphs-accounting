import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule,
  ModalModule,
  AccordionModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { NgxGaugeModule } from 'ngx-gauge';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as mapbox from 'mapbox-gl';
(mapbox as any).accessToken = environment.mapbox.accessToken

import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ManagementComponent } from './management/management.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PenggajianComponent } from './penggajian/penggajian.component';
import { PengurusanStorComponent } from './pengurusan-stor/pengurusan-stor.component';
import { KawalanBajetComponent } from './kawalan-bajet/kawalan-bajet.component';
import { AkaunBelumBayarComponent } from './akaun-belum-bayar/akaun-belum-bayar.component';
import { EClaimComponent } from './e-claim/e-claim.component';
import { PengekosanProjekComponent } from './pengekosan-projek/pengekosan-projek.component';
import { PembelianComponent } from './pembelian/pembelian.component';
import { PinjamanComponent } from './pinjaman/pinjaman.component';
import { PinjamanKakitanganComponent } from './pinjaman-kakitangan/pinjaman-kakitangan.component';
import { BajetOnlineComponent } from './bajet-online/bajet-online.component';
import { TerimaanComponent } from './terimaan/terimaan.component';
import { TuntutanComponent } from './tuntutan/tuntutan.component';
import { PelaburanComponent } from './pelaburan/pelaburan.component';
import { BukuTunaiComponent } from './buku-tunai/buku-tunai.component';
import { LejarAmComponent } from './lejar-am/lejar-am.component';
import { PerakaunanAsetComponent } from './perakaunan-aset/perakaunan-aset.component';
import { PengurusanAsetComponent } from './pengurusan-aset/pengurusan-aset.component';
import { AkaunBelumTerimaComponent } from './akaun-belum-terima/akaun-belum-terima.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementComponent,
    AnalyticsComponent,
    ReportComponent,
    ProfileComponent,
    SettingsComponent,
    PenggajianComponent,
    PengurusanStorComponent,
    KawalanBajetComponent,
    AkaunBelumBayarComponent,
    EClaimComponent,
    PengekosanProjekComponent,
    PembelianComponent,
    PinjamanComponent,
    PinjamanKakitanganComponent,
    BajetOnlineComponent,
    TerimaanComponent,
    TuntutanComponent,
    PelaburanComponent,
    BukuTunaiComponent,
    LejarAmComponent,
    PerakaunanAsetComponent,
    PengurusanAsetComponent,
    AkaunBelumTerimaComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(AdminRoutes),
    HttpClientModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgxGaugeModule
  ]
})
export class AdminModule { }
