import React, { FC, useState } from 'react'
import { Box, makeStyles, Typography, IconButton, Grid } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  GLIconCancelCircle,
  GLIconContainer,
  GLIconCopy,
  GLIconDownload,
  GLIconFiles,
  GLIconShip,
  GLIconInfo,
  GLIconPlus,
} from './GLIcons'
import { colors } from '../../theme'
import { GLButton } from './Forms/GLButtons'
import Link from 'next/link'
import { GLInput } from './Forms/GLInput'
import { GLCheckBox } from '../FormItems/GLInput'
import { GLTooltip } from './GLTooltip'

import { ModalPaymentForm } from './Modals/ModalPaymentForm'
import { ModalReject } from './Modals/ModalReject'
import { ModalDemandForm } from './Modals/ModalDemandForm'

import { ModalBillingInformation } from './Modals/ModalBillingInformation'
import { GLDemandDetailProperties } from './GLDemandDetailProperties'
import { IOrder, IOrderTransportsResponse } from '../../interfaces/Order'
import { SET_FORM_INITIAL_DATA, useDataContext } from '../../providers/DataProvider'

import Requests from '../../requests'
import moment from 'moment'

import { GLReservationTable } from '../ProfilePage/GLReservationTable'
import { TransportServiceIds } from '../../utils/global'
import { IAddDocument } from '../../interfaces/OrderDocument'
import { ModalFileUpload } from './Modals/ModalFileUpload'

interface IGLAccordionDemandProps {
  data: IOrder
  guarantor: boolean
}

export const GLAccordionRequest: FC<IGLAccordionDemandProps> = ({ data, guarantor }) => {
  console.log(data)
  const classes = useStyles()
  const request = Requests()
  const { dispatch } = useDataContext()
  const taxInput = React.useRef<any>(null)
  const guarantorInput = React.useRef<any>(null)
  const [routeDetail, setRouteDetail] = useState<boolean>(false)
  const [modalFileUploadStatus, setModalFileUploadStatus] = useState<boolean>(false)
  const [modalRejectStatus, setModalRejectStatus] = useState<boolean>(false)
  const [modalPaymentStatus, setModalPaymentStatus] = useState<boolean>(false)
  const [modalDemandFormStatus, setModalDemandFormStatus] = useState<boolean>(false)
  const [modalBillingInformationStatus, setModalBillingInformationStatus] = useState<boolean>(false)
  const [demandDetail, setDemandDetail] = useState<IOrderTransportsResponse | null>(null)
  const [guarantorCheck, setGuarantorCheck] = useState<boolean>(false)
  const [requestPriceForDifferentCompany, setRequestPriceForDifferentCompany] = useState<boolean>(
    false
  )
  const [billForDifferentCompany, setBillingForDifferentCompany] = useState<boolean>(false)
  const [billForForeingCompany, setBillingForForeignCompany] = useState<boolean>(false)
  const [checkPendingApproval, setCheckPendingApproval] = useState<boolean>(false)
  const [taxFile, setTaxFile] = useState<IAddDocument | null>(null)
  const [guarantorFile, setGuarantorFile] = useState<IAddDocument | null>(null)
  const [errorCount, setErrorCount] = useState<number>(0)
  const [billingInformation, setBillingInformation] = useState<any>(null)

  const handleRouteDetail = () => {
    setRouteDetail((prev) => !prev)
    if (demandDetail == null) {
      setTimeout(() => {
        getOrderTransport()
      }, 150)
    }
  }

  const getOrderTransport = () => {
    request.OrderTransportRequest.getList({
      pageNumber: 1,
      pageSize: 10,
      orderId: data.id,
      transportId: 0,
      includeTransportService: true,
    })
      .then((res) => {
        setDemandDetail(res)
      })
      .catch((err) => console.log(err))
  }
  /*
  const handleCardFooterStatus = () => {
    setCardFooterStatus((prev) => !prev)
  }
*/

  const handleChecked1 = (event: any) => {
    setRequestPriceForDifferentCompany(event)
  }
  const handleChecked2 = (event: any) => {
    setBillingForDifferentCompany(event)
  }
  const handleChecked3 = (event: any) => {
    setBillingForForeignCompany(event)
  }

  const modalFileUploadHandleChange = () => {
    setModalFileUploadStatus((prev) => !prev)
  }

  const modalRejectHandleChange = () => {
    setModalRejectStatus((prev) => !prev)
  }

  const modalPaymentHandleChange = () => {
    setModalPaymentStatus((prev) => !prev)
  }

  const modalDemandFormHandleChange = () => {
    const ids: number[] = []
    demandDetail?.data.forEach((dDetail) => {
      if (dDetail.transportService?.integrationId == TransportServiceIds.LOKAL)
        ids.push(dDetail.transportService.id)
      if (dDetail.transportService?.integrationId == TransportServiceIds.NAVLUN)
        ids.push(dDetail.transportService.id)
      if (dDetail.transportService?.integrationId == TransportServiceIds.TASIMA)
        ids.push(dDetail.transportService.id)
    })

    let categoryName = ''
    if (data.category?.nameEN) categoryName = data.category?.nameEN

    const transportOptions: any = []

    demandDetail?.data.forEach((dDetail) => {
      if (!dDetail.isLocal) {
        transportOptions.push({ id: dDetail.transportOptionId, count: dDetail.count })
      }
    })

    dispatch({
      type: SET_FORM_INITIAL_DATA,
      payload: {
        origin: {
          locationId: data.originLocationId,
          port: data.originLocationName,
        },
        destination: {
          locationId: data.destinationLocationId,
          port: data.destinationLocationName,
        },
        productName: data.productName,
        cost: data.cost,
        grossWeight: data.grossWeight,
        transportTypeContainerId: data.transportTypeContainerId,
        count: data.count,
        width: data.width,
        height: data.height,
        size: data.size,
        capacity: data.capacity,
        imo: data.imo,
        imoClassId: data?.imoClassId ? data.imoClassId : null,
        unCode: data?.unCode ? data.unCode : null,
        hoardable: data.hoardable,
        floorCount: data.floorCount,
        packingTypeId: data.packingTypeId,
        needInsurance: data.needInsurance,
        hsCode: data.hsCode,
        storeHouse: data.storeHouse,
        loadTypeId: data.loadTypeId,
        loadingSpeed: data.loadingSpeed,
        loweringSpeed: data.loweringSpeed,
        carriageTypeId: data.carriageTypeId,
        demandTypeId: data.demandTypeId,
        incotermId: data.incotermId,
        note: data.note,
        ids: ids,
        categoryId: data.categoryId,
        categoryName: categoryName,
        transportOptions: transportOptions,
      },
    })

    setModalDemandFormStatus((prev) => !prev)
  }

  const modalBillingInformationHandleChange = () => {
    setModalBillingInformationStatus((prev) => !prev)
  }

  const onSubmit = () => {
    setErrorCount((prev) => prev + 1)
    demandsApprove()
  }

  const requestedGuarantor = guarantor // daha sonra degistir guaraontor ile

  const demandsApprove = () => {
    if (requestedGuarantor) {
      request.OrderRequest.approveOrder({
        orderId: data.id,
        requestPriceForDifferentCompany,
        billForDifferentCompany,
        billForForeingCompany,
        name: billingInformation.name,
        surname: billingInformation.surname,
        identificationNumber: billingInformation.identificationNumber,
        companyName: billingInformation.companyName,
        companyAddress: billingInformation.companyAddress,
        country: billingInformation.country,
        city: billingInformation.city,
        postalCode: billingInformation.postalCode,
        taxNumber: billingInformation.taxNumber,
        taxAdministration: billingInformation.taxAdministration,
        documents: [taxFile, guarantorFile] as IAddDocument[],
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    } else {
      request.OrderRequest.approveOrder({ orderId: data.id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }

  const onayla = () => {
    if (requestedGuarantor) {
      setCheckPendingApproval(true)
    } else {
      demandsApprove()
    }
  }

  const check = (isErrorCount: boolean) => {
    if (errorCount > 0) {
      return isErrorCount
    } else return false
  }

  const checkBillingInformation = () => {
    if (errorCount > 0) {
      if (requestPriceForDifferentCompany || billForDifferentCompany || billForForeingCompany) {
        if (billingInformation === null) {
          return true
        } else return false
      }
    } else return false
  }

  const onTaxFileSelected = async (event: any) => {
    const fileUploaded = event.target.files[0]

    if (fileUploaded) {
      const fileData = (await toBase64(fileUploaded)) as string
      setTaxFile({
        orderId: data?.id,
        documentTypeId: 2,
        fileName: fileUploaded.name,
        fileBase64String: fileData?.split('base64,')[1],
      })
    }
  }

  const onGuarantorFileSelected = async (event: any) => {
    const fileUploaded = event.target.files[0]

    if (fileUploaded) {
      const fileData = (await toBase64(fileUploaded)) as string
      setGuarantorFile({
        orderId: data?.id,
        documentTypeId: 3,
        fileName: fileUploaded.name,
        fileBase64String: fileData?.split('base64,')[1],
      })
    }
  }

  const modalFileTaxUpload = () => {
    taxInput.current.click()
  }
  const modalFileGuarantorUpload = () => {
    guarantorInput.current.click()
  }

  const getStatus = (status: number) => {
    if (status === 0) return '-'
    else if (status === 1) return 'Teklif Talep Edildi'
    else if (status === 2) return 'Müşteri Onayı Bekliyor'
    else if (status === 3) return 'Teklif İptal Edildi'
    else if (status === 4) return 'Teklif Reddedildi'
    else if (status === 5) return 'Finansal Onay Bekleniyor'
    else if (status === 6) return 'Olumsuz Finansal Değerlendirme'
    else if (status === 7) return 'Satınalma Bekleniyor'
    else if (status === 8) return 'Ödeme Süresi Geçti'
    else if (status === 9) return 'Satınalma Gerçekleşti'
  }

  const date: any = new Date().getDate()
  return (
    <Box className={`${classes.accordion} ${routeDetail && 'active'}`}>
      <Box className={classes.accordionTitle}>
        <Box className={classes.titleTop}>
          <Box className={classes.headTitle}>
            <span className="icon">
              <GLIconShip color={colors.sea} />
            </span>
            <span className="title">
              <Typography>Talep No: {data?.id}</Typography>
              <span>
                <em>{moment(data?.date).format('DD.MM.YYYY')}</em>
                {data?.date != null ? (
                  date - parseInt(moment(data?.date).format('DD')) < 7 ? (
                    <span>YENI</span>
                  ) : (
                    <span>{date - parseInt(moment(data?.date).format('DD'))} gün önce</span>
                  )
                ) : (
                  <span>-</span>
                )}
              </span>
            </span>
          </Box>
          <Box className={classes.headInfo}>
            <p>{getStatus(2)}</p>
            <span>Son Ödeme Tarihi: {moment(data?.duedate).format('DD.MM.YYYY')}</span>
          </Box>
          <Box className={`${classes.arrow} ${routeDetail && 'active'}`}>
            <IconButton onClick={handleRouteDetail}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.titleBottom}>
          <Box className="route">
            <span>{data?.originLocationName}</span>
            <em>&nbsp;</em>
            <span>{data?.destinationLocationName}</span>
          </Box>
          <Box className="type">
            <span className="icon">
              <GLIconContainer color={colors.iron} />
            </span>
            <span className="name">{data?.transportTypeContainer?.code}</span>
          </Box>
          <Box className="price">
            {data?.requestTotalPrice ? <span>{data?.requestTotalPrice} $</span> : <span>- $</span>}
          </Box>
        </Box>
      </Box>
      <Box className={`${classes.accordionDetail} ${routeDetail && 'active'}`}>
        {data?.status === 2 ? (
          <>
            <hr />
            <Grid container spacing={5}>
              <Grid item xs={8}>
                <Typography variant="inherit" color="primary">
                  İlgili fiyat Gösterge Fiyat niteliğindedir. Talebiniz sonucu oluşacak nihai fiyat
                  tarafınıza bir sonraki aşamalarda iletilecektir.
                </Typography>
              </Grid>
              <Grid item spacing={3} xs={4}>
                <GLButton
                  text="Teklif Bekleniyor"
                  shadow={false}
                  textColor={colors.white}
                  textColorHover={colors.grayMedium}
                  borderColor={colors.grayMedium}
                  bgColor={colors.grayMedium}
                  bgColorHover="transparent"
                  // onClick={modalBillingInformationHandleChange}
                />
              </Grid>
            </Grid>
            <br />
            <hr />
            <GLDemandDetailProperties data={data} title="Detaylar" />
            <br />
            <GLReservationTable data={demandDetail} />
          </>
        ) : data?.status === 1 ? (
          <>
            <hr />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Box className={classes.dueDatePrice}>
                  <strong>
                    {data?.requestTotalPrice ? (
                      <span>{data?.requestTotalPrice} $</span>
                    ) : (
                      <span>3495 $</span>
                    )}
                  </strong>
                  <p>
                    Son Ödeme Tarihi:{' '}
                    {data?.duedate ? moment(data?.duedate).format('DD.MM.YYYY') : <span>-</span>}
                  </p>
                </Box>
              </Grid>
              {!checkPendingApproval ? (
                <Grid item xs={7}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <GLButton
                        text="Reddet"
                        shadow={false}
                        textColor={colors.grayMedium}
                        textColorHover={colors.white}
                        borderColor={colors.grayMedium}
                        bgColor="transparent"
                        onClick={modalRejectHandleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <GLButton
                        text="Onayla"
                        shadow={false}
                        textColor={colors.white}
                        textColorHover={colors.grayMedium}
                        borderColor={colors.seaHover}
                        bgColor={colors.sea}
                        bgColorHover="transparent"
                        onClick={onayla}
                        //disabled={guarantorCheck ? false : true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
            {checkPendingApproval ? null : (
              <>
                <br />
                <hr />
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={3}>
                    <GLButton
                      text="Dosyalarım"
                      textColor={colors.iron}
                      bgColor="transparent"
                      bgColorHover="transparent"
                      shadow={false}
                      startIcon={<GLIconFiles color={colors.grayMedium} />}
                      endIcon={<Box className={classes.btnBadge}>1</Box>}
                      iconSize="24px"
                      onClick={modalFileUploadHandleChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <GLButton
                      text="Teklifi Kopyala"
                      textColor={colors.grayMedium}
                      bgColor="transparent"
                      bgColorHover="transparent"
                      shadow={false}
                      startIcon={<GLIconCopy color={colors.grayMedium} />}
                      iconSize="24px"
                      onClick={modalDemandFormHandleChange}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            <br />
            <hr />
            {guarantor && checkPendingApproval ? (
              <>
                {' '}
                <Typography className="title">
                  Firma Doğrulama{'  '}
                  <GLTooltip
                    title={
                      'Fiyat talebinde bulunan tüzel kişi adına düzenlenecek fatura bilgileri teyid edildiği alandır.'
                    }
                  >
                    <GLIconInfo color={colors.iron} />
                  </GLTooltip>
                </Typography>
                <GLCheckBox
                  label={
                    'Sitede kayıtlı firma ünvanınmdan farklı bir firma için fiyat talep ediyorum.'
                  }
                  onChange={(event) => handleChecked1(event)}
                  disabled={false}
                  checked={requestPriceForDifferentCompany}
                />
                {'  '}
                <GLTooltip
                  title={
                    'Siteye kayıt olduğunuz firma unvanından farklı bir firma unvanı (bağlı olunan grup şirketleri de dahil olmak üzere) için fiyat talep ediyorsanız işaretleyiniz.'
                  }
                >
                  <GLIconInfo color={colors.iron} />
                </GLTooltip>
                <GLCheckBox
                  label={
                    'Taşıma hizmetine ilişkin fatura, sitede kayıtlı firma ünvanımdan farklı bir firmaya kesilecek.'
                  }
                  onChange={(event) => handleChecked2(event)}
                  disabled={false}
                  checked={billForDifferentCompany}
                />
                {'  '}
                <GLTooltip
                  title={
                    'Fatura düzenlenecek firma unvanı (bağlı olunan grup şirketleri de dahil olmak üzere) siteye kayıt olduğunuz firma unvanından farklı ise işaretleyiniz.'
                  }
                >
                  <GLIconInfo color={colors.iron} />
                </GLTooltip>
                <GLCheckBox
                  label={
                    'Taşıma hizmetine ilişkin fatura, yabancı menşeili bir firma ünvanına kesilecek.'
                  }
                  onChange={(event) => handleChecked3(event)}
                  disabled={false}
                  checked={billForForeingCompany}
                />
                {'  '}
                <GLTooltip
                  title={'Faturanın düzenleneceği firma yabancı menşeili ise işaretleyiniz.'}
                >
                  <GLIconInfo color={colors.iron} />
                </GLTooltip>{' '}
                <br />
                <br />
                <Link href="#">
                  <Box className={classes.download} onClick={() => setGuarantorCheck(true)}>
                    <Typography variant="inherit" className={classes.btnDownload}>
                      <GLIconDownload color={colors.iron} />
                      Garantörlük Metnini İndir
                    </Typography>
                    {check(guarantorCheck === false) ? (
                      <Typography variant="inherit" className={classes.textDanger}>
                        <GLIconCancelCircle color={colors.danger} />
                        Devam etmek için lütfen garantörlük metnini indiriniz.
                      </Typography>
                    ) : null}
                  </Box>
                </Link>
                {requestPriceForDifferentCompany ||
                billForDifferentCompany ||
                billForForeingCompany ? (
                  <>
                    <br />
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <GLButton
                          text={'Fatura Bilgisi Ekle'}
                          bgColor="transparent"
                          bgColorHover={colors.grayLight}
                          borderColor={checkBillingInformation() ? colors.danger : colors.sea}
                          textColor={colors.sea}
                          shadow={false}
                          endIcon={
                            checkBillingInformation() ? (
                              <Box className={classes.btnAdd}>
                                <GLIconCancelCircle color={colors.danger} />
                              </Box>
                            ) : (
                              <Box className={classes.btnAdd}>
                                <GLIconPlus color={colors.sea} />
                              </Box>
                            )
                          }
                          onClick={modalBillingInformationHandleChange}
                        />
                      </Grid>
                      <Grid item xs={7}>
                        {checkBillingInformation() ? (
                          <Typography variant="inherit" className={classes.textDanger}>
                            Devam etmek için lütfen fatura bilgisini ekleyiniz.
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>
                  </>
                ) : null}
                <br />
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={5}>
                    <GLInput
                      value={taxFile ? taxFile.fileName : null}
                      label="Vergi Levhası*"
                      placeholder="Vergi Levhanızı Yükleyiniz"
                      error={check(taxFile ? false : true)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <GLButton
                      text="Yükle"
                      bgColor="transparent"
                      bgColorHover={colors.grayLight}
                      borderColor={colors.sea}
                      textColor={colors.sea}
                      shadow={false}
                      onClick={modalFileTaxUpload}
                    />
                    <input
                      type="file"
                      ref={taxInput}
                      onChange={onTaxFileSelected}
                      style={{ display: 'none' }}
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={5}>
                    <GLInput
                      label="Garantörlük Belgesi*"
                      placeholder="Garantörlük Yazınızı Yükleyiniz"
                      value={guarantorFile ? guarantorFile.fileName : null}
                      error={check(guarantorFile ? false : true)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <GLButton
                      text="Yükle"
                      bgColor="transparent"
                      bgColorHover={colors.grayLight}
                      borderColor={colors.sea}
                      textColor={colors.sea}
                      shadow={false}
                      onClick={modalFileGuarantorUpload}
                    />
                    <input
                      type="file"
                      ref={guarantorInput}
                      onChange={onGuarantorFileSelected}
                      style={{ display: 'none' }}
                    />
                  </Grid>
                </Grid>
                <br />
                {check(taxFile && guarantorFile ? false : true) ? (
                  <Typography variant="inherit" className={classes.textDanger}>
                    Lütfen işaretli alanları doldurunuz.
                  </Typography>
                ) : null}
                <br />
                <br />
                <Typography variant="inherit" color="primary">
                  *Finansal süreçlerimizi başlatabilmemiz &apos;&apos;Garantörlük&apos;&apos;
                  Metinin en geç {moment(data?.duedate).format('DD.MM.YYYY')} tarihine kadar doküman
                  yükle alanına yüklemenizi rica ederiz.
                </Typography>
                <br />
                <br />
                <br />
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Box className={classes.dueDatePrice}>
                      <strong>
                        {data?.requestTotalPrice ? (
                          <span>{data?.requestTotalPrice} $</span>
                        ) : (
                          <span>2421 $</span>
                        )}
                      </strong>
                      <p>
                        Son Ödeme Tarihi:{' '}
                        {data?.duedate ? (
                          moment(data?.duedate).format('DD.MM.YYYY')
                        ) : (
                          <span>-</span>
                        )}
                      </p>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <GLButton
                      text="Reddet"
                      shadow={false}
                      textColor={colors.grayMedium}
                      textColorHover={colors.white}
                      borderColor={colors.grayMedium}
                      bgColor="transparent"
                      onClick={modalRejectHandleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <GLButton
                      text="Devam et"
                      shadow={false}
                      textColor={colors.white}
                      textColorHover={colors.grayMedium}
                      borderColor={colors.seaHover}
                      bgColor={colors.sea}
                      bgColorHover="transparent"
                      onClick={onSubmit}
                      //disabled={guarantorCheck ? false : true}
                    />
                  </Grid>
                </Grid>
                <br />
                <hr />
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={3}>
                    <GLButton
                      text="Dosyalarım"
                      textColor={colors.iron}
                      bgColor="transparent"
                      bgColorHover="transparent"
                      shadow={false}
                      startIcon={<GLIconFiles color={colors.grayMedium} />}
                      endIcon={<Box className={classes.btnBadge}>1</Box>}
                      iconSize="24px"
                      onClick={modalFileUploadHandleChange}
                    />
                  </Grid>
                  {data?.status === 4 || data?.status === 8 ? (
                    <Grid item xs={4}>
                      <GLButton
                        text="Teklifi Kopyala"
                        textColor={colors.grayMedium}
                        bgColor="transparent"
                        bgColorHover="transparent"
                        shadow={false}
                        startIcon={<GLIconCopy color={colors.grayMedium} />}
                        iconSize="24px"
                        onClick={modalDemandFormHandleChange}
                      />
                    </Grid>
                  ) : null}
                </Grid>
                <br />
                <hr />
              </>
            ) : null}

            {/* <GLCheckBox>
              Taşıma hizmetine ilişkin fatura, sitede kayıtlı firma ünvanımdan farklı bir firmaya
              kesilecek.
            </GLCheckBox>
            <GLCheckBox>
              Taşıma hizmetine ilişkin fatura, yabancı menşeili bir firma ünvanına kesilecek.
            </GLCheckBox> */}
            {/* <Link href="#">
              <Box className={classes.download} onClick={() => setGuarantorCheck(true)}>
                <Typography variant="inherit" className={classes.btnDownload}>
                  <GLIconDownload color={colors.iron} />
                  Garantörlük Metnini İndir
                </Typography>
                {guarantorCheck === false ? (
                  <Typography variant="inherit" className={classes.textDanger}>
                    <GLIconCancelCircle color={colors.danger} />
                    Devam etmek için lütfen garantörlük metnini indiriniz.
                  </Typography>
                ) : null}
              </Box>
            </Link>
            <br />
            */}
            {/* <Grid container spacing={2}>
              <Grid item xs={5}>
                <Box className={classes.dueDatePrice}>
                  <strong>
                    {data?.requestTotalPrice ? (
                      <span>{data?.requestTotalPrice} $</span>
                    ) : (
                      <span>- $</span>
                    )}
                  </strong>
                  <p>
                    Son Ödeme Tarihi:{' '}
                    {data?.duedate ? moment(data?.duedate).format('DD.MM.YYYY') : <span>-</span>}
                  </p>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <GLButton
                      text="Reddet"
                      shadow={false}
                      textColor={colors.grayMedium}
                      textColorHover={colors.white}
                      borderColor={colors.grayMedium}
                      bgColor="transparent"
                      onClick={modalRejectHandleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <GLButton
                      text="Devam Et"
                      shadow={false}
                      textColor={colors.white}
                      textColorHover={colors.grayMedium}
                      borderColor={colors.grayMedium}
                      bgColor={colors.grayMedium}
                      bgColorHover="transparent"
                      onClick={modalBillingInformationHandleChange}
                      disabled={guarantorCheck ? false : true}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <hr /> */}
            <GLDemandDetailProperties data={data} title="Detaylar" />
            <br />
            <GLReservationTable data={demandDetail} />
          </>
        ) : data?.status === 7 ? (
          <>
            <hr />
            <Grid container spacing={9}>
              <Grid item xs={6}>
                <Box className={classes.dueDatePrice}>
                  <strong>
                    {data?.requestTotalPrice ? (
                      <span>{data?.requestTotalPrice} $</span>
                    ) : (
                      <span>123123 $</span>
                    )}
                  </strong>
                  <p>
                    Son Ödeme Tarihi:{' '}
                    {data?.duedate ? moment(data?.duedate).format('DD.MM.YYYY') : <span>-</span>}
                  </p>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <GLButton
                  text="Ödeme Yap"
                  shadow={false}
                  textColor={colors.white}
                  textColorHover={colors.grayMedium}
                  borderColor={colors.seaHover}
                  bgColor={colors.sea}
                  bgColorHover="transparent"
                  onClick={() => console.log('satin alim bekleniyor')}
                />
              </Grid>
            </Grid>
            <br />
            <hr />
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={3}>
                <GLButton
                  text="Dosyalarım"
                  textColor={colors.iron}
                  bgColor="transparent"
                  bgColorHover="transparent"
                  shadow={false}
                  startIcon={<GLIconFiles color={colors.grayMedium} />}
                  endIcon={<Box className={classes.btnBadge}>1</Box>}
                  iconSize="24px"
                  onClick={modalFileUploadHandleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <GLButton
                  text="Teklifi Kopyala"
                  textColor={colors.grayMedium}
                  bgColor="transparent"
                  bgColorHover="transparent"
                  shadow={false}
                  startIcon={<GLIconCopy color={colors.grayMedium} />}
                  iconSize="24px"
                  onClick={modalDemandFormHandleChange}
                />
              </Grid>
            </Grid>
            <hr />
            <br />
            <GLDemandDetailProperties data={data} title="Detaylar" />
            <br />

            <GLReservationTable data={demandDetail} />
          </>
        ) : data?.status === 8 ? (
          <>
            <hr />
            <Grid container spacing={9}>
              <Grid item xs={6}>
                <Box className={classes.dueDatePrice}>
                  <strong>
                    {data?.requestTotalPrice ? (
                      <span>{data?.requestTotalPrice} $</span>
                    ) : (
                      <span>123123 $</span>
                    )}
                  </strong>
                  <p>
                    Son Ödeme Tarihi:{' '}
                    {data?.duedate ? moment(data?.duedate).format('DD.MM.YYYY') : <span>-</span>}
                  </p>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <GLButton
                  text="Ödeme Yap"
                  shadow={false}
                  textColor={colors.white}
                  textColorHover={colors.white}
                  borderColor={colors.grayMedium}
                  bgColor={colors.grayMedium}
                  bgColorHover={colors.grayMedium}
                  onClick={() => setCheckPendingApproval(true)}
                  //disabled={guarantorCheck ? false : true}
                />
              </Grid>
            </Grid>
            <br />
            <hr />
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={3}>
                <GLButton
                  text="Dosyalarım"
                  textColor={colors.iron}
                  bgColor="transparent"
                  bgColorHover="transparent"
                  shadow={false}
                  startIcon={<GLIconFiles color={colors.grayMedium} />}
                  endIcon={<Box className={classes.btnBadge}>1</Box>}
                  iconSize="24px"
                  onClick={modalFileUploadHandleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <GLButton
                  text="Teklifi Kopyala"
                  textColor={colors.grayMedium}
                  bgColor="transparent"
                  bgColorHover="transparent"
                  shadow={false}
                  startIcon={<GLIconCopy color={colors.grayMedium} />}
                  iconSize="24px"
                  onClick={modalDemandFormHandleChange}
                />
              </Grid>
            </Grid>
            <hr />
            <br />
            <GLDemandDetailProperties data={data} title="Detaylar" />
            <br />

            <GLReservationTable data={demandDetail} />
          </>
        ) : null}

        {/*
        <Box></Box>
        <Link href="#">
          <Box className={classes.download}>
            <Typography variant="inherit" className={classes.btnDownload}>
              <GLIconDownload color={colors.iron} />
              Garantörlük Metnini İndir
            </Typography>
            <Typography variant="inherit" className={classes.textDanger}>
              <GLIconCancelCircle color={colors.danger} />
              Devam etmek için lütfen garantörlük metnini indiriniz.
            </Typography>
          </Box>
        </Link>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={5}>
            <GLInput label="Vergi Levhası*" placeholder="Vergi Levhanızı Yükleyiniz" />
          </Grid>
          <Grid item xs={4}>
            <GLButton
              text="Yükle"
              bgColor="transparent"
              bgColorHover={colors.grayLight}
              borderColor={colors.sea}
              textColor={colors.sea}
              shadow={false}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={5}>
            <GLInput label="Garantörlük Belgesi*" placeholder="Garantörlük Yazınızı Yükleyiniz" />
          </Grid>
          <Grid item xs={4}>
            <GLButton
              text="Yükle"
              bgColor="transparent"
              bgColorHover={colors.grayLight}
              borderColor={colors.sea}
              textColor={colors.sea}
              shadow={false}
            />
          </Grid>
        </Grid>
        <br />
        <Typography variant="inherit" color="primary">
          *Finansal süreçlerimizi başlatabilmemiz &apos;&apos;Garantörlük&apos;&apos; Metinin en geç
          #Son Ödeme Tarihi# tarihine kadar doküman yükle alanına yüklemenizi rica ederiz.
        </Typography>
        <br />
        <br />
        <br />
        <hr />
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={3}>
            <GLButton
              text="Dosyalarım"
              textColor={colors.iron}
              bgColor="transparent"
              bgColorHover="transparent"
              shadow={false}
              startIcon={<GLIconFiles color={colors.grayMedium} />}
              endIcon={<Box className={classes.btnBadge}>1</Box>}
              iconSize="24px"
              onClick={modalFileUploadHandleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <GLButton
              text="Teklifi Kopyala"
              textColor={colors.grayMedium}
              bgColor="transparent"
              bgColorHover="transparent"
              shadow={false}
              startIcon={<GLIconCopy color={colors.grayMedium} />}
              iconSize="24px"
              onClick={modalDemandFormHandleChange}
            />
          </Grid>
        </Grid> */}
      </Box>

      <ModalFileUpload
        orderId={data?.id}
        status={modalFileUploadStatus}
        handleChange={modalFileUploadHandleChange}
      />
      <ModalBillingInformation
        onChangeBillingInfo={setBillingInformation}
        status={modalBillingInformationStatus}
        handleChange={modalBillingInformationHandleChange}
      />
      <ModalReject
        orderId={data?.id}
        status={modalRejectStatus}
        handleChange={modalRejectHandleChange}
      />
      <ModalPaymentForm status={modalPaymentStatus} handleChange={modalPaymentHandleChange} />
      <ModalDemandForm
        initialData={data}
        status={modalDemandFormStatus}
        handleChange={modalDemandFormHandleChange}
      />
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  hr: {
    border: 'none',
    borderBottom: `1px solid ${colors.grayLight}`,
    margin: '24px 0',
  },
  accordion: {
    border: `1px solid ${colors.grayMedium}`,
    backgroundColor: colors.white,
    borderRadius: '5px',
    padding: '16px 30px',
    marginBottom: '16px',
    transition: 'all .2s ease',

    '&.active': {
      borderColor: colors.sea,
      backgroundColor: colors.blueLight,
    },
  },
  accordionTitle: {},
  accordionDetail: {
    height: 0,
    overflow: 'hidden',
    padding: 0,
    transition: 'all .2s ease',

    '&.active': {
      height: 'auto',
      padding: '1rem 0',
    },

    '& hr': {
      border: 'none',
      borderBottom: `1px solid ${colors.grayLight}`,
      margin: '0 0 16px 0',
    },

    '& .title': {
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '16px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.sea,
      paddingBottom: '16px',
      margin: 0,
    },
  },
  titleTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${colors.grayLight}`,
    paddingBottom: '16px',
  },
  titleBottom: {
    display: 'flex',
    padding: '32px 0 16px 0',

    '& .route': {
      flexBasis: '55%',
      display: 'flex',
      alignItems: 'center',
      paddingRight: '16px',

      '& span': {
        display: 'block',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '16px',
        color: colors.black,
        whiteSpace: 'nowrap',
      },

      '& em': {
        position: 'relative',
        display: 'block',
        width: '52px',
        height: '1px',
        margin: '0 1rem',
        backgroundColor: colors.grayMedium,

        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          marginTop: '-4px',
          display: 'block',
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          backgroundColor: colors.grayLight,
          border: `1px solid ${colors.grayMedium}`,
        },

        '&:after': {
          left: 'auto',
          right: '0',
        },
      },
    },

    '& .type': {
      flexBasis: '30%',
      display: 'flex',
      alignItems: 'center',

      '& .icon': {
        marginRight: '1rem',

        '& svg': {
          width: '24px',
          height: '24px',
        },
      },

      '& .name': {
        display: 'block',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '16px',
        color: colors.black,
        whiteSpace: 'nowrap',
      },
    },

    '& .price': {
      flexBasis: '15%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',

      '& span': {
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '150%',
        color: colors.iron,
        fontFeatureSettings: "'pnum' on, 'lnum' on",
      },
    },
  },
  arrow: {
    flexBasis: '15%',
    display: 'flex',
    justifyContent: 'flex-end',

    '& .MuiButtonBase-root': {
      border: `1px solid ${colors.grayMedium}`,
      transform: 'rotate(0deg)',
      transition: 'all .2s ease',
      padding: '7px',

      '& svg': {
        fill: colors.sea,
      },
    },

    '&.active': {
      '& .MuiButtonBase-root': {
        transform: 'rotate(-180deg)',
      },
    },
  },
  headTitle: {
    flexBasis: '55%',
    display: 'flex',

    '& .icon': {
      paddingRight: '1em',
      lineHeight: 0,

      '& svg': {
        width: '40px',
        height: '40px',
      },
    },

    '& .title': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',

      '& p': {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '16px',
        fontFeatureSettings: "'pnum' on, 'lnum' on",
        color: colors.sea,
        paddingBottom: '2px',
      },

      '& span': {
        display: 'flex',
        alignItems: 'center',

        '& em': {
          display: 'block',
          fontWeight: 600,
          fontSize: '12px',
          lineHeight: '14px',
          fontStyle: 'normal',
          fontFeatureSettings: "'pnum' on, 'lnum' on",
          color: colors.grayMedium,
        },

        '& span': {
          display: 'block',
          fontWeight: 700,
          fontSize: '10px',
          lineHeight: '12px',
          color: colors.white,
          backgroundColor: colors.iron,
          fontFeatureSettings: "'pnum' on, 'lnum' on",
          padding: '3px 9px 1px 9px',
          marginLeft: '8px',
          borderRadius: '5px',
        },
      },
    },
  },
  headInfo: {
    flexBasis: '30%',

    '& p': {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '16px',
      color: colors.sea,
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      margin: 0,
    },

    '& span': {
      display: 'block',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '14px',
      color: colors.iron,
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      padding: '6px 0 0 0',
    },
  },
  download: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 0',
  },
  btnDownload: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',

    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '16px',
    textDecorationLine: 'underline',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    color: colors.sea,

    '& svg': {
      width: '24px',
      height: '24px',
      marginRight: '1rem',
    },
  },
  textDanger: {
    display: 'flex',
    alignItems: 'flex-start',
    color: colors.danger,

    '& svg': {
      width: '16px',
      height: '16px',
      margin: '1px 16px 0 0',
    },
  },
  dueDatePrice: {
    '& strong': {
      display: 'block',
      fontWeight: 700,
      fontSize: '32px',
      lineHeight: '38px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.iron,
      paddingBottom: '7px',
    },

    '& p': {
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '14px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.grayMedium,
      margin: 0,
    },
  },
  btnBadge: {
    backgroundColor: colors.iron,
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    fontWeight: 600,
    fontSize: '12px !important',
    lineHeight: '18px',
    textAlign: 'center',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    color: colors.white,
  },
  btnAdd: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    fontWeight: 600,
    fontSize: '12px !important',
    lineHeight: '18px',
    textAlign: 'center',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    color: colors.white,
  },
}))

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
