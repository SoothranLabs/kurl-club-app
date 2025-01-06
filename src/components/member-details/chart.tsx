import { Card, CardContent, CardHeader } from '../ui/card';

export default function ChartSpace() {
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-[16px] mt-[16px] h-[343px]">
        <Card>
          <CardHeader>
            <h3>Attendence chart</h3>
          </CardHeader>
          <CardContent>{/* <p>Content goes here</p> */}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3>Payment</h3>
          </CardHeader>
          <CardContent>{/* <p>Content goes here</p> */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
