import { GetServerSidePropsContext } from 'next'
import AnnouncementCategoryRequest from './AnnouncementCategoryRequest'
import AnnouncementRequest from './AnnouncementRequest'
import SliderRequest from './SliderRequest'
import CityRequest from './CityRequest'
import CountryRequest from './CountryRequest'
import UserRequest from './UserRequest'
import AuthRequest from './AuthRequest'
import TransportTypesRequest from './TransportTypesRequest'
import ConfigRequest from './ConfigRequest'
import SearchRequest from './SearchRequest'
import TransportTypeContainerRequest from './TransportTypeContainerRequest'
import ConfigOptionsRequest from './ConfigOptionsRequest'
import RoleRequest from './RoleRequest'
import UserRoleRequest from './UserRoleRequest'
import ShippingLineRequest from './ShippingLineRequest'
import TransportServiceRequest from './TransportServiceRequest'
import TransportOptionRequest from './TransportOptionRequest'
import StaticContentRequest from './StaticContentRequest'
import LanguageRequest from './LanguageRequest'
import ConfigGroupRequest from './ConfigGroupRequest'
import CategoryRequest from './CategoryRequest'
import UserCompanyRequest from './UserCompanyRequest'
import PackingTypesRequest from './PackingTypesRequest'
import ImoClassRequest from './ImoClassRequest'
import OrderRequest from './OrderRequest'
import LoadTypeRequest from './LoadTypeRequest'
import DemanTypeRequest from './DemanTypeRequest'
import SpecialRequest from './SpecialRequest'
import CarriageTypeRequest from './CarriageTypeRequest'
import IncotermRequest from './IncotermRequest'
import ForgotPasswordRequest from './ForgotPasswordRequest'
import OrderTransportRequest from './OrderTransportRequest'
import OrderDocumentRequest from './OrderDocumentRequest'
import DocumentTypeRequest from './DocumentTypeRequest'
import RefusalReasonRequest from './RefusalReasonRequest'

const Requests = (serverSideContext: GetServerSidePropsContext | null = null) => {
  return {
    CityRequest: new CityRequest(serverSideContext),
    AnnouncementCategoryRequest: new AnnouncementCategoryRequest(serverSideContext),
    SliderRequest: new SliderRequest(serverSideContext),
    AnnouncementRequest: new AnnouncementRequest(serverSideContext),
    CountryRequest: new CountryRequest(serverSideContext),
    UserRequest: new UserRequest(serverSideContext),
    AuthRequest: new AuthRequest(serverSideContext),
    TransportTypesRequest: new TransportTypesRequest(serverSideContext),
    ConfigRequest: new ConfigRequest(serverSideContext),
    SearchRequest: new SearchRequest(serverSideContext),
    TransportTypeContainerRequest: new TransportTypeContainerRequest(serverSideContext),
    ConfigOptionsRequest: new ConfigOptionsRequest(serverSideContext),
    RoleRequest: new RoleRequest(serverSideContext),
    UserRoleRequest: new UserRoleRequest(serverSideContext),
    ShippingLineRequest: new ShippingLineRequest(serverSideContext),
    TransportServiceRequest: new TransportServiceRequest(serverSideContext),
    TransportOptionRequest: new TransportOptionRequest(serverSideContext),
    StaticContentRequest: new StaticContentRequest(serverSideContext),
    LanguageRequest: new LanguageRequest(serverSideContext),
    ConfigGroupRequest: new ConfigGroupRequest(serverSideContext),
    CategoryRequest: new CategoryRequest(serverSideContext),
    UserCompanyRequest: new UserCompanyRequest(serverSideContext),
    PackingTypesRequest: new PackingTypesRequest(serverSideContext),
    ImoClassRequest: new ImoClassRequest(serverSideContext),
    OrderRequest: new OrderRequest(serverSideContext),
    LoadTypeRequest: new LoadTypeRequest(serverSideContext),
    DemanTypeRequest: new DemanTypeRequest(serverSideContext),
    SpecialRequest: new SpecialRequest(serverSideContext),
    CarriageTypeRequest: new CarriageTypeRequest(serverSideContext),
    IncotermRequest: new IncotermRequest(serverSideContext),
    ForgotPasswordRequest: new ForgotPasswordRequest(serverSideContext),
    OrderTransportRequest: new OrderTransportRequest(serverSideContext),
    OrderDocumentRequest: new OrderDocumentRequest(serverSideContext),
    DocumentTypeRequest: new DocumentTypeRequest(serverSideContext),
    RefusalReasonRequest: new RefusalReasonRequest(serverSideContext),
  }
}

export default Requests
