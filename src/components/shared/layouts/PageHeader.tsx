import ServerDateTime from '@/components/shared/ServerDateTime';

const PageHeader = () => {
  return (
    <section>
      <div>PageHeader</div>
      <div>
        <ServerDateTime cityTimezone='Asia/Seoul' />
      </div>
    </section>
  );
};

export default PageHeader;
