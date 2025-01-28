import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const treatmentPrices = {
  "First Consultation": 80,
  "Follow Up": 130,
  "Follow Up (Concession Rate)": 115,
  "15x Package": 1725,
};

const EarningsCalculator = () => {
  const [treatments, setTreatments] = useState([{ treatment: "", patientCount: 0 }]);
  const [commission, setCommission] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const handleTreatmentChange = (index, value) => {
    const updatedTreatments = [...treatments];
    updatedTreatments[index].treatment = value;
    setTreatments(updatedTreatments);
  };

  const handlePatientCountChange = (index, count) => {
    const updatedTreatments = [...treatments];
    updatedTreatments[index].patientCount = parseInt(count) || 0;
    setTreatments(updatedTreatments);
  };

  const addTreatmentRow = () => {
    setTreatments([...treatments, { treatment: "", patientCount: 0 }]);
  };

  const calculateEarnings = () => {
    let total = 0;
    treatments.forEach(({ treatment, patientCount }) => {
      if (treatment && treatmentPrices[treatment]) {
        total += treatmentPrices[treatment] * patientCount;
      }
    });
    const earningsAfterCommission = total * (commission / 100);
    setTotalEarnings(earningsAfterCommission);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card className="mb-4">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Chiropractor Earnings Calculator</h1>

          {treatments.map((entry, index) => (
            <div key={index} className="mb-4">
              <Select
                onValueChange={(value) => handleTreatmentChange(index, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a treatment" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(treatmentPrices).map((treatment) => (
                    <SelectItem key={treatment} value={treatment}>
                      {treatment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Number of patients"
                className="mt-2"
                onChange={(e) => handlePatientCountChange(index, e.target.value)}
              />
            </div>
          ))}

          <Button className="mt-4 w-full" onClick={addTreatmentRow}>
            Add Another Treatment
          </Button>

          <div className="mt-4">
            <label htmlFor="commission" className="block mb-2">Commission Percentage (%)</label>
            <Input
              id="commission"
              type="number"
              placeholder="Enter your commission percentage"
              onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
            />
          </div>

          <Button className="mt-4 w-full" onClick={calculateEarnings}>
            Calculate Earnings
          </Button>

          {totalEarnings > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h2 className="text-lg font-semibold">Total Earnings</h2>
              <p className="text-xl font-bold">${totalEarnings.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsCalculator;
