export const calculateTgtAchData = (
  selectedValue: string,
  userDashboardData: any = {}
) => {
  const tempData: any = {};
  if (Object.keys(userDashboardData).length) {
    selectedValue = selectedValue.split(' ').join('').toLowerCase();
    tempData.target = userDashboardData['target' + selectedValue] || 0;
    tempData.achieve = userDashboardData['achieve' + selectedValue] || 0;
    tempData.ftd = userDashboardData['ftd' + selectedValue] || 0;
    tempData.lymtd = userDashboardData['lymtd' + selectedValue] || 0;
    tempData.lmtd = userDashboardData['lmtd' + selectedValue] || 0;
    tempData.landing = userDashboardData['landing' + selectedValue] || 0;

    if (tempData.achieve) {
      const temp1 =
        tempData.lmtd > 0 ? (tempData.achieve / tempData.lmtd - 1) * 100 : 0;
      tempData.lmtdGrowthPercentage = temp1 ? temp1.toFixed(2) : 0;
      const temp2 =
        tempData.lymtd > 0 ? (tempData.achieve / tempData.lymtd - 1) * 100 : 0;
      tempData.lymtdGrowthPercentage = temp2 ? temp2.toFixed(2) : 0;
    }

    let temp: any =
      tempData.achieve > 0 && tempData.target > 0
        ? tempData.achieve / tempData.target
        : 0;
    tempData.achievedPercentage = (temp * 100).toFixed(2);
    // tempData.achievedPercentage = (tempData.achievement/tempData.target) * 100
    let tempTodo = tempData.target - tempData.achieve;
    tempData.balanceToDo = tempTodo > 0 ? tempTodo.toFixed(2) : 0;

    tempData.creditLimit = userDashboardData.creditLimit
      ? userDashboardData.creditLimit
      : 'NA';
    tempData.currentOutStanding = userDashboardData.currentOutStanding
      ? userDashboardData.currentOutStanding
      : 0;
    tempData.thirtyDaysOutStanding = userDashboardData.thirtyDaysOutStanding
      ? userDashboardData.thirtyDaysOutStanding
      : 0;
    tempData.availableCreditLimit =
      tempData.creditLimit != 'NA' && tempData.currentOutStanding != 0
        ? (tempData.creditLimit - tempData.currentOutStanding).toFixed(2)
        : 'NA';
    Object.keys(tempData).map((key) => {
      tempData[key] = tempData[key].toLocaleString();
    });
  }
  return tempData;
};

export const logoutButtonId = 'logout';
