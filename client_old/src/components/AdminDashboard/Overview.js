import React from 'react';
import styled from 'styled-components';
import { useMyContext } from '../../context/AppContext';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';

// Initialize FusionCharts with required dependencies
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Overview = () => {
    // Dummy data for charts
    const dailyRevenueData = {
        chart: {
            caption: "Daily Revenue",
            xAxisName: "Day",
            yAxisName: "Revenue ($)",
            theme: "fusion"
        },
        data: [
            { label: "Mon", value: "1000" },
            { label: "Tue", value: "1500" },
            { label: "Wed", value: "1200" },
            { label: "Thu", value: "1800" },
            { label: "Fri", value: "2000" },
            { label: "Sat", value: "2500" },
            { label: "Sun", value: "2200" }
        ]
    };

    const monthlyOrdersData = {
        chart: {
            caption: "Monthly Orders",
            xAxisName: "Month",
            yAxisName: "Number of Orders",
            theme: "fusion"
        },
        data: [
            { label: "Jan", value: "200" },
            { label: "Feb", value: "250" },
            { label: "Mar", value: "300" },
            { label: "Apr", value: "280" },
            { label: "May", value: "320" },
            { label: "Jun", value: "350" }
        ]
    };

    const categoryDistributionData = {
        chart: {
            caption: "Category Distribution",
            subcaption: "For all orders",
            showpercentvalues: "1",
            defaultcenterlabel: "Total orders",
            aligncaptionwithcanvas: "0",
            captionpadding: "0",
            decimals: "1",
            plottooltext: "<b>$percentValue</b> of orders are <b>$label</b>",
            centerlabel: "# orders: $value",
            theme: "fusion"
        },
        data: [
            { label: "Main Course", value: "400" },
            { label: "Appetizers", value: "300" },
            { label: "Desserts", value: "200" },
            { label: "Beverages", value: "100" }
        ]
    };

    return (
        <OverviewWrapper>
            <Title>Restaurant Overview</Title>

            <ChartSection>
                <ChartCard>
                    <ReactFC
                        type="column2d"
                        width="100%"
                        height="400"
                        dataFormat="json"
                        dataSource={dailyRevenueData}
                    />
                </ChartCard>

                <ChartCard>
                    <ReactFC
                        type="line"
                        width="100%"
                        height="400"
                        dataFormat="json"
                        dataSource={monthlyOrdersData}
                    />
                </ChartCard>
            </ChartSection>

            <ChartSection>
                <ChartCard>
                    <ReactFC
                        type="doughnut2d"
                        width="100%"
                        height="400"
                        dataFormat="json"
                        dataSource={categoryDistributionData}
                    />
                </ChartCard>

                <StatCard>
                    <StatTitle>Quick Stats</StatTitle>
                    <StatItem>
                        <StatLabel>Total Revenue</StatLabel>
                        <StatValue>$12,345</StatValue>
                    </StatItem>
                    <StatItem>
                        <StatLabel>Total Orders</StatLabel>
                        <StatValue>1,234</StatValue>
                    </StatItem>
                    <StatItem>
                        <StatLabel>Average Order Value</StatLabel>
                        <StatValue>$45.67</StatValue>
                    </StatItem>
                    <StatItem>
                        <StatLabel>Active Tables</StatLabel>
                        <StatValue>8/20</StatValue>
                    </StatItem>
                </StatCard>
            </ChartSection>
        </OverviewWrapper>
    );
};

const OverviewWrapper = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ChartSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
`;

const StatCard = styled(ChartCard)`
  display: flex;
  flex-direction: column;
`;

const StatTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StatLabel = styled.span`
  color: #666;
`;

const StatValue = styled.span`
  font-weight: bold;
  color: #333;
`;

export default Overview;

