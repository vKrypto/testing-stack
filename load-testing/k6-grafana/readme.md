## bash : lscpu
```
Architecture:            x86_64
  CPU op-mode(s):        32-bit, 64-bit
  Address sizes:         46 bits physical, 48 bits virtual
  Byte Order:            Little Endian
CPU(s):                  20
  On-line CPU(s) list:   0-19
Vendor ID:               GenuineIntel
  Model name:            12th Gen Intel(R) Core(TM) i7-12700K
    CPU family:          6
    Model:               151
    Thread(s) per core:  2
    Core(s) per socket:  12
    Socket(s):           1
    Stepping:            2
    CPU max MHz:         3840.0000
    CPU min MHz:         800.0000
    BogoMIPS:            7219.20
    Flags:               fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid a
                         perfmperf tsc_known_freq pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm 3dnowprefetch cpuid_fault in
                         vpcid_single ssbd ibrs ibpb stibp ibrs_enhanced tpr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid rdseed adx smap clflushopt clwb intel_pt sha_ni xsaveopt xsavec xgetbv1 xsaves split_
                         lock_detect avx_vnni dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp hwp_pkg_req umip pku ospke waitpkg gfni vaes vpclmulqdq tme rdpid movdiri movdir64b fsrm md_clear serialize pconfig arch_lbr flush_l1d arch_capabili
                         ties
Virtualization features: 
  Virtualization:        VT-x
Caches (sum of all):     
  L1d:                   512 KiB (12 instances)
  L1i:                   512 KiB (12 instances)
  L2:                    12 MiB (9 instances)
  L3:                    25 MiB (1 instance)
NUMA:                    
  NUMA node(s):          1
  NUMA node0 CPU(s):     0-19
Vulnerabilities:         
  Itlb multihit:         Not affected
  L1tf:                  Not affected
  Mds:                   Not affected
  Meltdown:              Not affected
  Mmio stale data:       Not affected
  Retbleed:              Not affected
  Spec store bypass:     Mitigation; Speculative Store Bypass disabled via prctl and seccomp
  Spectre v1:            Mitigation; usercopy/swapgs barriers and __user pointer sanitization
  Spectre v2:            Mitigation; Enhanced IBRS, IBPB conditional, RSB filling, PBRSB-eIBRS SW sequence
  Srbds:                 Not affected
  Tsx async abort:       Not affected
```

## k6 script:
```
let options = {
    vus: 2500, // 2500 Virtual Users (VUs) to run in parallel
    duration: '1s', // Duration for which the VUs will send requests (effectively all at once)
};
```

## setup:
- fastapi server "/" with 200 ms timeout
- using docker stack with multiple replicas and multiple workers
- using k6 to trigger test --> influxdb --> grafana(for graphs)

## results:

- [8 replicas 5 workers](./results/2500%20rps(%208%20replica%205%20worker%20each)/)
- [20 replicas 4 workers](./results/2500%20rps(%2020%20replica%204%20worker%20each)/)
- [20 replicas 5 workers](./results/2500%20rps(%2020%20replica%205%20worker%20each)/)
- [20 replicas 41 workers](./results/2500%20rps(%2020%20replica%2041%20worker%20each)/)