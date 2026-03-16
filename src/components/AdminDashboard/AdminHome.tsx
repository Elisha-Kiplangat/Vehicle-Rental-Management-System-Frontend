import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser, faClipboardList, faEnvelope, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useGetSummaryQuery, useGetUsersTotalsQuery, useGetbookingTotalsQuery, useGetmessageTotalsQuery, useGetActiveBookingTotalsQuery } from '../../features/summaryApi';

const AdminHome = () => {
  const { data: metrics, error, isLoading } = useGetSummaryQuery();
  const { data: users } = useGetUsersTotalsQuery();
  const { data: bookings } = useGetbookingTotalsQuery();
  const { data: unreadMessages } = useGetmessageTotalsQuery();
  const { data: activeBookigs } = useGetActiveBookingTotalsQuery();

  const summaryCards = [
    {
      id: 'vehicles',
      label: 'Total Vehicles',
      value: metrics?.totalVehicles[0]?.count || 0,
      icon: faCar,
    },
    {
      id: 'users',
      label: 'Total Users',
      value: users?.totalCustomers || 0,
      icon: faUser,
    },
    {
      id: 'bookings',
      label: 'Total Bookings',
      value: bookings?.totalBooking || 0,
      icon: faClipboardList,
    },
    {
      id: 'messages',
      label: 'Unread Messages',
      value: unreadMessages?.totalMessages || 0,
      icon: faEnvelope,
    },
    {
      id: 'active',
      label: 'Active Rentals',
      value: activeBookigs?.totalActiveBookings || 0,
      icon: faChartLine,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-red-700 shadow-sm">
          Error loading metrics
        </div>
      </div>
    );
  }

  return (
    <div className="admin-home min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Summary</h1>
        <p className="text-gray-500 mt-2">Quick overview of fleet, users, bookings, and support activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.id}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-3">{card.value}</p>
              </div>

              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FontAwesomeIcon icon={card.icon} className="text-xl" />
              </div>
            </div>

            <div className="mt-5 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
