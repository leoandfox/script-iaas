
param(
[string]$username
)
Connect-VIServer -Server vcenter.cloudis.lan -User administrator@vsphere.local -Password Supinfo2019! 
#New-VirtualPortGroup -VDSwitch  -Name "Network-$($username)"
Get-VDSwitch -Name "DSwitch-VM" | New-VDPortgroup -Name "Network-$($username)" -NumPorts 8
Disconnect-VIServer -Server vcenter.cloudis.lan 

#Get-VDSwitch -Name "DSwitch-VM" | New-VDPortgroup -Name "MyVDPortGroup" -NumPorts 8 
