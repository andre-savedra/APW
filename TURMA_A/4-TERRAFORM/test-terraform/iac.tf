terraform {
  required_providers {
    azurerm = {
        source = "hashicorp/azurerm"
        version = "4.48.0"
    }
  }
}

provider "azurerm" {
  resource_provider_registrations = "none"
  subscription_id = "250ae9c3-6c33-4030-b72a-ed22fce22920"
  features {
  }
}

resource "azurerm_resource_group" "andre_savedra2_test_rg" {
    name = "andre_savedra2_test_rg"
    location = "West Europe"  
}


resource "azurerm_service_plan" "andre_savedra2_test_sp" {
  name = "andre_savedra2_test_sp"
  resource_group_name = azurerm_resource_group.andre_savedra2_test_rg.name
  location = azurerm_resource_group.andre_savedra2_test_rg.location
  sku_name = "S1"
  os_type = "Windows"
}

resource "azurerm_windows_web_app" "andre_savedra2_test_app" {
  name = "andre-savedra2-test-app"
  resource_group_name = azurerm_resource_group.andre_savedra2_test_rg.name
  location = azurerm_resource_group.andre_savedra2_test_rg.location
  service_plan_id = azurerm_service_plan.andre_savedra2_test_sp.id
  site_config {
   always_on = false 
  }
  app_settings = {
    "SCM_DO_BUILD_DURING_DEPLOYMENT" = "true"
  }
}


resource "azurerm_windows_web_app_slot" "andre_savedra2_test_app_slot" {
  name = "andre-savedra2-test-app-qa"
  app_service_id = azurerm_windows_web_app.andre_savedra2_test_app.id
  site_config {    
  }  
}


