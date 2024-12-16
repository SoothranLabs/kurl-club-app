import Banner from '@/components/dashboard/banner';
import CardList from '@/components/dashboard/card-list';
import Header from '@/components/dashboard/header';
import React from 'react';

function Dashboard() {
  return (
    <div className="container py-8">
      <Header />
      <CardList />
      <Banner />
    </div>
  );
}

export default Dashboard;
