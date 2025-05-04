import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';

const NAVIGATION: Navigation = [


    {
        segment: '',
        title: 'Invoices',
        icon: <ReceiptIcon />,
    },
    {
        segment: 'product',
        title: 'Products',
        icon: <ShoppingCartIcon />,
    },



];



export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const toolpadRouter = useMemo(() => {
        return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: (path: string | URL) => navigate(path.toString()),
        };
    }, [location, navigate]);

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={toolpadRouter}
            branding={{
                title: "Zein Exim"
            }}



        >
            <DashboardLayout slots={{
                toolbarActions: () => null,
            }}>
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
