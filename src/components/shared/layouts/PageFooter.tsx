import ServerDateTime from '@/components/shared/ServerDateTime';

const PageFooter = () => {
  return (
    <section>
      <div>PageFooter.tsx ©</div>
      <div>
        <ServerDateTime cityTimezone='Asia/Seoul' />
      </div>
    </section>
  );
};

export default PageFooter;
