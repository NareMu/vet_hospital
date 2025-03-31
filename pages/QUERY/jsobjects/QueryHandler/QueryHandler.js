export default {
  runSelectedQuery: async () => {
    const queryId = dropdown_query_selector.selectedOptionValue;
    
    if (!queryId) {
      showAlert("Please select a query first", "warning");
      return;
    }
    
    try {
      switch(queryId) {
        case 'low_stock':
          await Query_low_stock.run();
          table_results.setData(Query_low_stock.data);
          break;
          
        case 'top_staff':
          await Query_top_staff.run({
            limit: input_limit.value || 5
          });
          table_results.setData(Query_top_staff.data);
          break;
          
        case 'busiest_day':
          await Query_busiest_day.run();
          table_results.setData(Query_busiest_day.data);
          break;
          
        case 'unpaid_bills':
          await Query_unpaid_bills.run();
          table_results.setData(Query_unpaid_bills.data);
          break;
          
        case 'staff_revenue':
          await Query_staff_revenue.run();
          table_results.setData(Query_staff_revenue.data);
          break;
          
        case 'diagnoses':
          await Query_diagnoses.run();
          table_results.setData(Query_diagnoses.data);
          break;
          
        case 'monthly_records':
          await Query_monthly_records.run();
          table_results.setData(Query_monthly_records.data);
          break;
          
        case 'overweight_pets':
          await Query_overweight_pets.run();
          table_results.setData(Query_overweight_pets.data);
          break;
          
        case 'staff_billing':
          await Query_staff_billing.run({
            limit: input_limit.value || 5
          });
          table_results.setData(Query_staff_billing.data);
          break;
          
        case 'clients_by_breed':
          if (!dropdown_breed.selectedOptionValue) {
            showAlert("Please select a breed first", "warning");
            return;
          }
          await Query_clients_by_breed.run();
          table_results.setData(Query_clients_by_breed.data);
          break;
          
        case 'pres_by_pet':
					if (!dropdown_pet.selectedOptionValue) {
            showAlert("Please select a pet first", "warning");
            return;
          }
					
          await Query_pres_by_pet.run();
          table_results.setData(Query_pres_by_pet.data);
          break;
          
        case 'rx_by_category':
					if (!search_bar.text) {
            showAlert("Please fill a search bar", "warning");
            return;
          }
					
          await Query_rx_by_category.run();
          table_results.setData(Query_rx_by_category.data);
          break;
          
        default:
          showAlert("This query is not yet implemented", "info");
      }
    } catch (error) {
      showAlert(`Query failed: ${error.message}`, "error");
      console.error("Query error:", error);
    }
  },
  
  showParams: () => {
    const queryId = dropdown_query_selector.selectedOptionValue;
    // Hide all parameter inputs first
    input_limit.setVisibility(false);
    dropdown_breed.setVisibility(false);
		dropdown_pet.setVisibility(false);
		search_bar.setVisibility(false);

    
    // Show relevant parameters
    switch(queryId) {
			case 'top_staff':
			case 'unpaid_bills':
      case 'staff_billing':
        input_limit.setVisibility(true);
        panel_query_params.setVisibility(true);
        break;
      case 'clients_by_breed':
        dropdown_breed.setVisibility(true);
        panel_query_params.setVisibility(true);
        break;
			case 'pres_by_pet':
        dropdown_pet.setVisibility(true);
        panel_query_params.setVisibility(true);
        break;
			case 'rx_by_category':
				search_bar.setVisibility(true);
				panel_query_params.setVisibility(true);
        break;
      default:
        panel_query_params.setVisibility(false);
    }
  }
}