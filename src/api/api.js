const ApiRootUrl = 'https://mini.jltechwise.cn/'

module.exports = {
  HomeArea: ApiRootUrl + 'Index/GetArea', // 首页地区接口
  HomeMileage: ApiRootUrl + 'Index/GetMileage', // 获取首页实时测试里程
  HomeDuration: ApiRootUrl + 'Index/GetDuration', // 获取首页实时测试时长
  HomeDeviceCount: ApiRootUrl + 'Index/GetDeviceCount', // 获取首页实时测试设备数
  HomeIndex: ApiRootUrl + 'Index/GetDeviceLocation', // 获取首页数据接口
  HomeDevice: ApiRootUrl + 'Index/GetDevice', // 获取设备列表数据
  HomeDeviceTrajectory: ApiRootUrl + 'Index/GetDeviceTrajectory', // 获取设备轨迹
  TestIndex: ApiRootUrl + 'Index/GetTestIndex',
  TestMileage: ApiRootUrl + 'Index/GetDayTestMileage',
  TestDuration: ApiRootUrl + 'Index/GetDayTestDuration',
  TestNewMileage: ApiRootUrl + 'Index/GetDayNewTestMileage',
  TestTrajectoryHistory: ApiRootUrl + 'Index/GetDeviceTrajectoryHistory'
}
