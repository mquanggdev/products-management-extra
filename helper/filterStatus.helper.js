module.exports = (req) => {
   const filterStatus =  [
        {
          name: "Tất cả",
          status: "",
        },
        {
          name: "Hoạt động",
          status: "active",
        },
        {
          name: "Dừng hoạt động",
          status: "inactive",
        }
      ];
      
      return filterStatus
} 