param(
[string]$namevm
)

Connect-VIServer -Server vcenter.cloudis.lan -User administrator@vsphere.local -Password Supinfo2019!
#$myVM = Get-CIVM -Name $namevm
#Restart-CIVMGuest $myVM
#$myvm = Get-Vm -Name $namevm

Restart-VM -VM $namevm -Confirm:$false
#Restart-VM -VM $namevm -Confirm -Server vcenter.cloudis.lan