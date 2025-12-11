import type { Ref } from "vue";

export const useCountdownState = (options: { daysRemaining: Ref<number> }) => {
  const { daysRemaining } = options;
  const display = useState(() => Math.floor(900 + Math.random() * 100));
  const gsap = useGSAP();
  const nameDay = useNameday(new Date());

  const progressBarValue = computed(
    () => (Math.max(950 - display.value, 0) / 950) * 100,
  );

  const initCounterAnimation = () => {
    const obj = { val: display.value };
    gsap.to(obj, {
      val: daysRemaining.value,
      duration: 3.5 + Math.random(),
      ease: "expo.out",
      onUpdate: () => {
        display.value = Math.round(obj.val);
      },
    });
  };

  return {
    display,
    nameDay,
    progressBarValue,
    initCounterAnimation,
  };
};
